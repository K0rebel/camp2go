import { InspectionStep } from '../types';

export const INSPECTION_STEPS: InspectionStep[] = [
  {
    id: 1,
    title: 'Okna zamknięte, okna dachowe?',
    shortLabel: 'Okna i heki',
    description: 'Upewnij się, że wszystkie okna boczne oraz okna dachowe (heki) są szczelnie zamknięte i zabezpieczone przed podwiewaniem wiatru.',
    hint: 'Wskazówka: Niezamknięty właz dachowy może zostać wyrwany przez pęd powietrza podczas jazdy.',
    cameraPosition: [-3.5, 3.5, 3.5],
    cameraTarget: [0.0, 1.5, 0.0],
    hotspots: [
      {
        id: 'roof-vent',
        position: [0.0, 3.0, 0.0],
        title: 'Okna dachowe',
        description: 'Sprawdź szczelność i zamknięcie'
      },
      {
        id: 'side-window',
        position: [-1.45, 1.6, 0.0],
        title: 'Okna boczne',
        description: 'Wszystkie okna dociśnięte i zaryglowane'
      }
    ]
  },
  {
    id: 2,
    title: 'Koło jezdne podniesione?',
    shortLabel: 'Koło manewrowe',
    description: 'Podciągnij koło manewrowe (podporowe) na dyszlu maksymalnie do góry, zaciśnij mocno korbę i zablokuj je w prowadnicy.',
    hint: 'Wskazówka: Zbyt nisko opuszczone kółko może zahaczyć o próg zwalniający lub krawężnik.',
    cameraPosition: [1.8, 1.4, -4.8],
    cameraTarget: [0.08, 0.65, -2.85],
    hotspots: [
      {
        id: 'jockey-wheel',
        position: [0.08, 0.45, -2.85],
        title: 'Koło manewrowe na dyszlu',
        description: 'Podniesione na max, zaciśnięte klamrą'
      }
    ]
  },
  {
    id: 3,
    title: 'Woda zakręcona?',
    shortLabel: 'Instalacja wodna',
    description: 'Wyłącz zasilanie pompki wody na panelu, zakręć zawory, zabezpiecz zbiornik oraz zamknij klapkę wlewu zewnętrznego.',
    hint: 'Wskazówka: Załączona pompka bez wody spali się w trasie.',
    cameraPosition: [3.8, 1.5, -0.50],
    cameraTarget: [1.41, 1.15, -0.50],
    hotspots: [
      {
        id: 'water-system',
        position: [1.42, 0.85, -0.50],
        title: 'Woda i wlew',
        description: 'Pompka wyłączona, wlew zamknięty'
      }
    ]
  },
  {
    id: 4,
    title: 'Odciągnięte movery?',
    shortLabel: 'Movery',
    description: 'Sprawdź po obu stronach przyczepy, czy rolki napędu movera zostały całkowicie odsunięte od bieżnika opon.',
    hint: 'Wskazówka: Jazda z dociśniętym moverem natychmiast niszczy opony i przekładnię napędu.',
    cameraPosition: [-3.5, 0.80, -0.25],
    cameraTarget: [-1.35, 0.65, -0.25],
    hotspots: [
      {
        id: 'mover-left',
        position: [-1.38, 0.35, -0.25],
        title: 'Mover lewy',
        description: 'Rolka odsunięta od bieżnika'
      },
      {
        id: 'mover-right',
        position: [1.38, 0.35, -0.25],
        title: 'Mover prawy',
        description: 'Rolka odsunięta od bieżnika'
      }
    ]
  },
  {
    id: 5,
    title: 'Podniesione na max stopy x4?',
    shortLabel: 'Podpory x4',
    description: 'Upewnij się, że wszystkie 4 podpory narożne (stopy) są wkręcone maksymalnie do góry i spoczywają w pozycji transportowej.',
    hint: 'Wskazówka: Nigdy nie ruszaj pojazdem z opuszczoną podporą!',
    cameraPosition: [-5.0, 1.20, 0.0],
    cameraTarget: [-1.30, 0.70, 0.0],
    hotspots: [
      {
        id: 'corner-steady-fl',
        position: [-1.30, 0.45, -1.48],
        title: 'Podpora przednia',
        description: 'Wkręcona do ramy na max'
      },
      {
        id: 'corner-steady-rl',
        position: [-1.25, 0.38, 2.99],
        title: 'Podpora tylna',
        description: 'Wkręcona do ramy na max'
      }
    ]
  },
  {
    id: 6,
    title: 'Wszystkie drzwiczki pozamykane?',
    shortLabel: 'Klapy i drzwiczki',
    description: 'Sprawdź drzwiczki kasety toaletowej, bakistę przednią, klapy schowków zewnętrznych oraz drzwi wejściowe.',
    hint: 'Wskazówka: Zamknij każdą klapę na kluczyk dla bezpieczeństwa na wybojach.',
    cameraPosition: [-4.0, 1.5, 1.80],
    cameraTarget: [-1.41, 1.05, 1.80],
    hotspots: [
      {
        id: 'external-lockers',
        position: [-1.42, 0.80, 1.80],
        title: 'Klapa serwisowa',
        description: 'Zamknięta na kluczyk'
      }
    ]
  },
  {
    id: 7,
    title: 'Drzwi przesuwne, półka zabezpieczona?',
    shortLabel: 'Drzwi i wnętrze',
    description: 'Zablokuj wewnętrzne drzwi przesuwne sypialni zatrzaskiem/paskiem, zamknij drzwi wejściowe na klucz oraz zabezpiecz luźne przedmioty na półkach.',
    hint: 'Wskazówka: Niezabezpieczone drzwi przesuwne mogą wyrwać się z szyny podczas gwałtownego hamowania.',
    cameraPosition: [4.2, 1.7, 0.25],
    cameraTarget: [1.41, 1.45, 0.25],
    hotspots: [
      {
        id: 'entrance-door',
        position: [1.43, 1.35, 0.25],
        title: 'Drzwi wejściowe',
        description: 'Zamknięte na klucz, drzwi przesuwne spięte'
      }
    ]
  },
  {
    id: 8,
    title: 'Gaz zakręcony, hebel wyłączony?',
    shortLabel: 'Gaz i Hebel',
    description: 'Zakręć główne zawory na butlach gazowych w przedniej bakiście oraz wyłącz / wyjmij czerwony kluczyk hebla zasilania movera.',
    hint: 'Wskazówka: Odcięcie zasilania movera heblem chroni przed przypadkowym włączeniem w trasie.',
    cameraPosition: [0.0, 2.2, -5.8],
    cameraTarget: [0.0, 1.4, -2.10],
    hotspots: [
      {
        id: 'gas-cylinders',
        position: [0.30, 0.95, -2.10],
        title: 'Butle gazowe',
        description: 'Zawory zakręcone'
      },
      {
        id: 'hebel-switch',
        position: [-0.55, 1.00, -2.15],
        title: 'Hebel 12V',
        description: 'Wyłączony / kluczyk wyjęty'
      }
    ]
  },
  {
    id: 9,
    title: 'Stolik w poprzek?',
    shortLabel: 'Stolik salonu',
    description: 'Ustaw stolik w poprzek / opuść do pozycji podróżnej i zablokuj przed niekontrolowanym przesuwaniem się po podłodze.',
    hint: 'Wskazówka: Złożony lub zablokowany stolik zabezpiecza meble przed uszkodzeniem.',
    cameraPosition: [4.0, 1.7, 0.50],
    cameraTarget: [1.41, 1.40, 0.50],
    hotspots: [
      {
        id: 'table-position',
        position: [1.42, 1.10, 0.50],
        title: 'Stolik salonu',
        description: 'Ustawiony w poprzek i zablokowany'
      }
    ]
  },
  {
    id: 10,
    title: 'Lodówka przełączona na 12V?',
    shortLabel: 'Lodówka 12V',
    description: 'Przełącz lodówkę na zasilanie 12V z instalacji samochodowej (zamiast 230V lub Gazu) i upewnij się, że zamek drzwi lodówki jest w pozycji blokady.',
    hint: 'Wskazówka: Zablokowane drzwi lodówki zapobiegają otwarciu na zakrętach.',
    cameraPosition: [-4.0, 1.6, -0.10],
    cameraTarget: [-1.41, 1.35, -0.10],
    hotspots: [
      {
        id: 'fridge-vent',
        position: [-1.42, 1.05, -0.10],
        title: 'Kratka lodówki 12V',
        description: 'Przełączona na 12V i zaryglowana'
      }
    ]
  },
];
