import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, ArrowDown, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaGate: React.FC = () => {
  const [isStandalone, setIsStandalone] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (installed PWA)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Detect mobile device
    const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const mobileCheck =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
      (window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    
    setIsMobile(mobileCheck);

    // Detect iOS
    const iosCheck = /iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(iosCheck);

    // Listen for beforeinstallprompt (Android / Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Listen for display-mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Only block on mobile devices that are not yet installed in standalone mode
  if (!isMobile || isStandalone || isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#030b17] text-white p-6 pt-safe pb-safe select-none overflow-y-auto">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex flex-col items-center text-center mt-4 sm:mt-8">
        <div className="w-20 h-20 mb-4 rounded-2xl shadow-2xl shadow-cyan-500/40 p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center animate-bounce duration-1000">
          <img
            src="/favicon.svg"
            alt="Camp2Go Logo"
            className="w-full h-full rounded-xl object-contain drop-shadow-md"
          />
        </div>
        <h1 className="text-2xl font-black tracking-widest text-white uppercase drop-shadow-md">
          CAMP2GO
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Wymagana instalacja</span>
        </div>
      </div>

      {/* Middle Instructions Card */}
      <div className="relative z-10 w-full max-w-sm my-auto bg-slate-900/85 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
        <h2 className="text-lg font-black text-center text-white leading-snug">
          Dodaj aplikację do ekranu głównego
        </h2>
        <p className="text-xs text-slate-300 text-center leading-relaxed">
          Aby korzystać z interaktywnej checklisty 3D i pełnego trybu offline w podróży, zainstaluj Camp2Go na pulpicie telefonu.
        </p>

        {isIOS ? (
          /* iOS Safari Step-by-Step Instructions */
          <div className="space-y-3 pt-2 text-left">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Share className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">1. Stuknij „Udostępnij”</span>
                <span className="text-slate-300">W dolnym pasku przeglądarki Safari stuknij ikonę udostępniania (kwadrat ze strzałką).</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <PlusSquare className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">2. „Do ekranu początkowego”</span>
                <span className="text-slate-300">Przewiń listę opcji i wybierz pozycję „Do ekranu początkowego” (ikona z plusem).</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Download className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">3. Kliknij „Dodaj” & Otwórz</span>
                <span className="text-slate-300">Kliknij „Dodaj” w prawym górnym rogu i uruchom Camp2Go z ikony na pulpicie.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Android / Chrome One-Click Install or Menu Instructions */
          <div className="space-y-3 pt-2">
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-xl shadow-cyan-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>ZAINSTALUJ NA TELEFONIE</span>
              </button>
            ) : (
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block mb-0.5">Dodaj z menu Chrome</span>
                    <span className="text-slate-300">Kliknij menu przeglądarki (trzy kropki ⋮ w prawym górnym rogu) i wybierz <b>„Zainstaluj aplikację”</b> lub <b>„Dodaj do ekranu głównego”</b>.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Hint / Pointer for iOS Safari */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 mb-1">
        {isIOS && (
          <div className="flex flex-col items-center animate-bounce text-cyan-300 text-xs font-semibold gap-1">
            <span>Przycisk udostępniania znajduje się na dole ekranu</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        )}
        <div className="text-[11px] text-slate-500 mt-2">
          Po dodaniu do ekranu głównego aplikacja uruchamia się bez paska przeglądarki w pełnym trybie 3D.
        </div>
      </div>
    </div>
  );
};
