import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get<any>(`/api/weather/${city}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }
}
