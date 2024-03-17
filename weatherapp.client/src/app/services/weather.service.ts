import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Weather } from '../interfaces/Weather';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get<Weather>(`${environment.apiURL}/weather/${city}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }
}
