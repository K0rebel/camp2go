# Camp2Go - Mobilny Asystent Inspekcji Przyczepy Kempingowej 3D 🚐

Nowoczesna aplikacja webowa typu **PWA (Progressive Web App)** przeznaczona do uruchamiania na telefonach (oraz komputerach i tabletach) i hostowania na platformie **Netlify**.

Aplikacja prowadzi użytkownika krok po kroku przez pełną listę kontrolną przed wyjazdem w trasę, wykorzystując **fotorealistyczny widok 3D przyczepy kempingowej** z płynnymi najazdami kamery, podświetlanymi punktami kontrolnymi (hotspotami), dźwiękami i wibracjami haptycznymi.

---

## 📱 Funkcje Aplikacji

1. **Interaktywna Wizualizacja 3D**:
   - Płynne najazdy kamery (kinowe obroty i zbliżenia) do każdego sprawdzanego elementu przyczepy.
   - Pulsujące punkty kontrolne (hotspoty 3D) z etykietami i podpowiedziami.
   - Blokada swobodnego obracania w trakcie inspekcji (zgodnie z założeniami wytycznych).
   - Realistyczne materiały PBR (odbicia światła, szyby, chrom, butle gazowe, koło jezdne, podpory, movery).

2. **10 Kluczowych Kroków Przed Wyjazdem**:
   - 1️⃣ Okna zamknięte, okna dachowe (heki) opuszczone i zaryglowane
   - 2️⃣ Koło jezdne (manewrowe) podniesione na max i dokręcone
   - 3️⃣ Zawory wody zakręcone (spust bojlera, wlew, pompka)
   - 4️⃣ Movery odciągnięte od opon
   - 5️⃣ 4 podpory stabilizujące wkręcone na maksa pod podłogę
   - 6️⃣ Wszystkie drzwiczki, luki i bakista pozamykane na klucz
   - 7️⃣ Wnętrze: drzwi przesuwne zapięte, półki zabezpieczone
   - 8️⃣ Gaz zakręcony na butlach, hebel 12V wyłączony
   - 9️⃣ Stolik w jadalni złożony / w pozycji transportowej
   - 🔟 Lodówka przełączona na zasilanie 12V

3. **Mobilny Interfejs (PWA & Offline)**:
   - Działa **w 100% offline** (przydatne na kempingach bez zasięgu GSM).
   - Zapisuje stan w pamięci telefonu (`localStorage`) – odświeżenie strony nie resetuje postępu.
   - Dźwięki Web Audio API + wibracje w telefonie (haptyka) przy zatwierdzaniu kroków.
   - Ekran końcowy z konfetti i podsumowaniem stanu "Gotowy do drogi! 🚐✨".

---

## 🚀 Uruchomienie Lokalne

Wymagany Node.js (wersja 18+):

```bash
# 1. Wejdź do katalogu projektu
cd c:\Users\kkuba\Documents\Camp2Go

# 2. Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000` (lub adresem wyświetlonym w terminalu).

---

## 🌐 Wdrożenie na Netlify (Krok po Kroku)

Projekt posiada gotowy plik `netlify.toml` z optymalizacjami buforowania i routingu SPA.

### Opcja A (Najprostsza - przez GitHub):
1. Utwórz nowe repozytorium na GitHub i wypchnij kod (`git init`, `git add .`, `git commit -m "Initial commit"`, `git push`).
2. Zaloguj się na [Netlify](https://app.netlify.com).
3. Kliknij **Add new site** > **Import an existing project** > **GitHub** i wybierz repozytorium `Camp2Go`.
4. Netlify automatycznie wykryje ustawienia z `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Kliknij **Deploy site** – aplikacja będzie aktywna w kilka sekund!

### Opcja B (Przez Netlify Drop / CLI):
1. Zbuduj projekt lokalnie: `npm run build`
2. Zaloguj się na [Netlify Drop](https://app.netlify.com/drop) i przeciągnij folder `dist`.

---

## 🛠️ Dostosowywanie Kroków i Modelu 3D

- **Konfiguracja kroków i pozycji kamery:** Edytuj plik [`src/config/stepsConfig.ts`](file:///c:/Users/kkuba/Documents/Camp2Go/src/config/stepsConfig.ts). Możesz tam zmieniać teksty, ostrzeżenia, współrzędne kamery (`cameraPosition`, `cameraTarget`) oraz współrzędne punktów (`hotspots`).
- **Podmiana na własny plik 3D (`.glb`):** Umieść własny model w `public/models/caravan.glb`.
