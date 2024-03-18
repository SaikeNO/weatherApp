# Aplikacja Pogodowa Angular / .NET

To jest aplikacja pogodowa zbudowana przy u¿yciu Angulara dla frontendu oraz .NET dla backendu. Umo¿liwia u¿ytkownikom zarz¹dzanie miastami (dodawanie, usuwanie, edytowanie), które s¹ przechowywane w bazie danych. Dodatkowo, u¿ytkownicy mog¹ przegl¹daæ aktualn¹ pogodê dla okreœlonych miast, pobieran¹ z zewnêtrznego API.

---
# Spis Treœci

1. [Aplikacja Pogodowa Angular / .NET](#aplikacja-pogodowa-angular--net)
2. [Funkcje](#funkcje)
3. [U¿yte Technologie](#u¿yte-technologie)
4. [Swagger API](#swagger-api)
5. [City Controller](#city-controller)
   - [Endpoints](#endpoints)
6. [Weather Controller](#weather-controller)
   - [Endpoints](#endpoints-1)

---

## Funkcje

- **Zarz¹dzanie Miastami:** U¿ytkownicy mog¹ dodawaæ, usuwaæ i edytowaæ miasta. Zmiany te s¹ odzwierciedlane w bazie danych.
- **Wyœwietlanie Pogody:** U¿ytkownicy mog¹ przegl¹daæ aktualn¹ pogodê dla okreœlonych miast, pobieran¹ z zewnêtrznego API.
- **Responsywny Design:** Aplikacja zosta³a zaprojektowana tak, aby dzia³aæ p³ynnie na ró¿nych urz¹dzeniach i rozmiarach ekranu.

## U¿yte Technologie

- **Frontend:** Angular
- **Backend:** .NET
- **Baza Danych:** MS SQL
- **Zewnêtrzne API:** [WeatherAPI](https://www.weatherapi.com/)

## Swagger API

Poni¿ej znajduje siê screenshot prezentuj¹cy widok Swaggera, który dokumentuje dostêpne endpointy API w aplikacji:

![Screenshot Swaggera](assets/swagger.png)

## City Controller

### Endpoints:

- **GET /api/City**
  - **Opis:** Zwraca listê wszystkich miast zapisanych w bazie danych.
  - **Parametry:** Brak.
  - **Przyk³adowy ¿¹danie:** `GET /api/City`
  - **Przyk³adowa odpowiedŸ:**
    ```json
    [
        {
            "id": 1,
            "name": "City1",
            "alias": "C1"
        },
        {
            "id": 2,
            "name": "City2",
            "alias": "C2"
        }
    ]
    ```
- **GET /api/City/{id}**
  - **Opis:** Zwraca szczegó³owe informacje o konkretnym mieœcie na podstawie jego identyfikatora.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
  - **Przyk³adowy ¿¹danie:** `GET /api/City/1`
  - **Przyk³adowa odpowiedŸ:**
    ```json
    {
        "id": 1,
        "name": "City1",
        "alias": "C1"
    }
    ```
- **POST /api/City**
  - **Opis:** Dodaje nowe miasto do bazy danych na podstawie danych przes³anych w ciele ¿¹dania.
  - **Parametry:**
    - Cia³o ¿¹dania powinno zawieraæ dane miasta w formacie JSON.
  - **Przyk³adowy ¿¹danie:**
    ```json
    POST /api/City
    {
        "name": "NewCity",
        "alias": "NC"
    }
    ```
  - **Przyk³adowa odpowiedŸ:**
    ```json
    {
        "id": 3,
        "name": "NewCity",
        "alias": "NC"
    }
    ```
- **DELETE /api/City/{id}**
  - **Opis:** Usuwa miasto o okreœlonym identyfikatorze z bazy danych.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
  - **Przyk³adowy ¿¹danie:** `DELETE /api/City/1`
  - **OdpowiedŸ:** Pusty cia³o odpowiedzi z kodem statusu `204 No Content`.
- **PUT /api/City/{id}**
  - **Opis:** Aktualizuje informacje o mieœcie o okreœlonym identyfikatorze na podstawie danych przes³anych w ciele ¿¹dania.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
    - Cia³o ¿¹dania powinno zawieraæ zaktualizowane dane miasta w formacie JSON.
  - **Przyk³adowy ¿¹danie:**
    ```json
    PUT /api/City/1
    {
        "name": "UpdatedCity",
        "alias": "UC"
    }
    ```
  - **Przyk³adowa odpowiedŸ:**
    ```json
    {
        "id": 1,
        "name": "UpdatedCity",
        "alias": "UC"
    }
    ```

## Weather Controller

### Endpoints:

- **GET /api/weather/{city}**
  - **Opis:** Zwraca informacje o aktualnej pogodzie dla okreœlonego miasta.
  - **Parametry:**
    - `city` (string) - Nazwa miasta, dla którego chcemy uzyskaæ informacje o pogodzie.
  - **Przyk³adowy ¿¹danie:** `GET /api/weather/Warsaw`
  - **Przyk³adowa odpowiedŸ:**
    ```json
    {
        "location": {
            "name": "Warsaw",
            "region": "",
            "country": "Poland",
            "lat": 52.25,
            "lon": 21,
            "tz_id": "Europe/Warsaw",
            "localtime_epoch": 1710781889,
            "localtime": "2024-03-18 18:11"
        },
        "current": {
            "temp_c": 2,
            "is_day": 0,
            "condition": {
                "text": "Moderate rain",
                "icon": "//cdn.weatherapi.com/weather/64x64/night/302.png",
                "code": 1189
            },
            "wind_mph": 6.9,
            "wind_kph": 11.2,
            "wind_dir": "NW",
            "cloud": 75,
            "feelslike_c": -1.2
        }
    }
    ```
