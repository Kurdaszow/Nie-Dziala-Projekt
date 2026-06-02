# Steam Stats

Aplikacja webowa umożliwiająca przeglądanie statystyk użytkowników platformy Steam, ich biblioteki gier oraz zdobytych osiągnięć. Projekt składa się z frontend-u renderowanego dynamicznie za pomocą JavaScriptu oraz serwera proxy Node.js/Express, który komunikuje się z oficjalnym API Steam.
<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/707290e7-0a17-4bad-bb99-13c94b086f7b" />

## Funkcje aplikacji

**Wyszukiwanie profilu** - znalezienie profilu za pomocą ID i jego danych dotyczcych posiadanych gier i ich statystyk

**Bibliteka gier** - lista gier posiadanych przez danego użytkownika z możliwościami sortowania
<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/3771d473-187c-4e17-9d11-c0b1d2f33e3a" />
**Statystyki gier** - statystiki dotyczące osiągnieć poszczególnych gier użytkownika z możliwościami filtrowania
<img width="1919" height="990" alt="image" src="https://github.com/user-attachments/assets/64561c8a-3df5-4bcc-a3cc-7bc87dc441a5" />

## Użyte technologie ##

**Frontend** - HTML, CSS, JavaScript

**Backend** - Node.js, express.js

## API ##
Aplikacja korzysta z dostępnego publicznie Steam Web API które pozwala na pobieranie danych dotyczących użytkowników i gier platformy Steam
### używane są 4 zapytania typu GET: 
**/games/:steamid** - Pobiera informacje o grach użytkownika

**/user/:steamid** - Pobiera informacje o użytkowniku

**/achievment/:appid** - Pobiera informacje o wszystkich achievementach dla konkretnej gry

**/unlocked/:steamid/:appid** - Pobiera informacje o achievementach dla konkretnej gry dla użytkownika

## Instalacja i Uruchomienie ##
### Pobranie plików
Pobrać pliki, backend.zip rozpakować
### Konfiguracja klucza API
w pliku servera server.js podmienić zmienną na własny klucz API:
```text
const API_KEY = "Your_Api_Key_Here";
```
### Uruchomienie Serwera
w folderze backend wpisać komendę uruchamiającą serwer node.js:
```text
node server.js
```
### Uruchomienie aplikacji
otworzyć stronę index.html w przeglądarce
