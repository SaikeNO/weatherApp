# Aplikacja Pogodowa Angular / .NET

To jest aplikacja pogodowa zbudowana przy u�yciu Angulara dla frontendu oraz .NET dla backendu. Umo�liwia u�ytkownikom zarz�dzanie miastami (dodawanie, usuwanie, edytowanie), kt�re s� przechowywane w bazie danych. Dodatkowo, u�ytkownicy mog� przegl�da� aktualn� pogod� dla okre�lonych miast, pobieran� z zewn�trznego API.

---
# Spis Tre�ci

1. [Aplikacja Pogodowa Angular / .NET](#aplikacja-pogodowa-angular--net)
2. [Funkcje](#funkcje)
3. [U�yte Technologie](#u�yte-technologie)
4. [Swagger API](#swagger-api)
5. [City Controller](#city-controller)
   - [Endpoints](#endpoints)
6. [Weather Controller](#weather-controller)
   - [Endpoints](#endpoints-1)

---

## Funkcje

- **Zarz�dzanie Miastami:** U�ytkownicy mog� dodawa�, usuwa� i edytowa� miasta. Zmiany te s� odzwierciedlane w bazie danych.
- **Wy�wietlanie Pogody:** U�ytkownicy mog� przegl�da� aktualn� pogod� dla okre�lonych miast, pobieran� z zewn�trznego API.
- **Responsywny Design:** Aplikacja zosta�a zaprojektowana tak, aby dzia�a� p�ynnie na r�nych urz�dzeniach i rozmiarach ekranu.

## U�yte Technologie

- **Frontend:** Angular
- **Backend:** .NET
- **Baza Danych:** MS SQL
- **Zewn�trzne API:** [WeatherAPI](https://www.weatherapi.com/)

## Swagger API

Poni�ej znajduje si� screenshot prezentuj�cy widok Swaggera, kt�ry dokumentuje dost�pne endpointy API w aplikacji:

![Screenshot Swaggera](assets/swagger.png)

## City Controller

### Endpoints:

- **GET /api/City**
  - **Opis:** Zwraca list� wszystkich miast zapisanych w bazie danych.
  - **Parametry:** Brak.
  - **Przyk�adowy ��danie:** `GET /api/City`
  - **Przyk�adowa odpowied�:**
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
  - **Opis:** Zwraca szczeg�owe informacje o konkretnym mie�cie na podstawie jego identyfikatora.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
  - **Przyk�adowy ��danie:** `GET /api/City/1`
  - **Przyk�adowa odpowied�:**
    ```json
    {
        "id": 1,
        "name": "City1",
        "alias": "C1"
    }
    ```
- **POST /api/City**
  - **Opis:** Dodaje nowe miasto do bazy danych na podstawie danych przes�anych w ciele ��dania.
  - **Parametry:**
    - Cia�o ��dania powinno zawiera� dane miasta w formacie JSON.
  - **Przyk�adowy ��danie:**
    ```json
    POST /api/City
    {
        "name": "NewCity",
        "alias": "NC"
    }
    ```
  - **Przyk�adowa odpowied�:**
    ```json
    {
        "id": 3,
        "name": "NewCity",
        "alias": "NC"
    }
    ```
- **DELETE /api/City/{id}**
  - **Opis:** Usuwa miasto o okre�lonym identyfikatorze z bazy danych.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
  - **Przyk�adowy ��danie:** `DELETE /api/City/1`
  - **Odpowied�:** Pusty cia�o odpowiedzi z kodem statusu `204 No Content`.
- **PUT /api/City/{id}**
  - **Opis:** Aktualizuje informacje o mie�cie o okre�lonym identyfikatorze na podstawie danych przes�anych w ciele ��dania.
  - **Parametry:**
    - `id` (int) - Identyfikator miasta.
    - Cia�o ��dania powinno zawiera� zaktualizowane dane miasta w formacie JSON.
  - **Przyk�adowy ��danie:**
    ```json
    PUT /api/City/1
    {
        "name": "UpdatedCity",
        "alias": "UC"
    }
    ```
  - **Przyk�adowa odpowied�:**
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
  - **Opis:** Zwraca informacje o aktualnej pogodzie dla okre�lonego miasta.
  - **Parametry:**
    - `city` (string) - Nazwa miasta, dla kt�rego chcemy uzyska� informacje o pogodzie.
  - **Przyk�adowy ��danie:** `GET /api/weather/Warsaw`
  - **Przyk�adowa odpowied�:**
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
