# KinoRadar — starter MVP

Polskojęzyczny, responsywny starter aplikacji KinoRadar. Aktualnie zawiera dane DEMO, nie rzeczywiste repertuary.

## Wymagania
- Node.js LTS
- npm

## Uruchomienie lokalne
1. Pobierz repozytorium.
2. W folderze projektu uruchom `npm install`.
3. Uruchom `npm run dev`.
4. Otwórz adres lokalny pokazany w terminalu.

## Budowanie
- `npm run build`
- `npm run preview`

## Co już działa
- wyszukiwanie po tytule, gatunku, sieci i mieście
- filtrowanie według miasta i sieci
- wybór przykładowych godzin seansów
- linki do głównych stron sieci kin
- responsywny układ
- podstawowy manifest PWA
- wstępny schemat SQL w `supabase/schema.sql`

## Ważne przed publikacją
- Dane filmów, kin i seansów w `src/App.tsx` są wyłącznie przykładowe.
- Linki prowadzą do głównych stron operatorów, nie do konkretnych zakupów.
- Nie ma jeszcze integracji repertuarowych ani backendu.
- Nie publikuj danych demo jako prawdziwych informacji o seansach.
- Przed integracją potwierdź warunki dostępu do repertuarów i możliwość tworzenia bezpośrednich linków do zakupu.
- Uzupełnij ikony PWA oraz skonfiguruj dostępność offline i politykę prywatności przed wdrożeniem produkcyjnym.

## Proponowany stack
- Frontend: React + TypeScript + Vite
- Hosting: Vercel lub podobny
- Backend / baza: Supabase (PostgreSQL)
- Metadane filmów: opcjonalnie TMDB, zgodnie z warunkami licencji i atrybucji
