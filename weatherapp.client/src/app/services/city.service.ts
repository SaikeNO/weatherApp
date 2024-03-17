import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../interfaces/City";
import { catchError, throwError } from "rxjs";
import { CreateCity } from "../interfaces/CreateCity";
import { environment } from '../../environments/environment';

@Injectable({providedIn: "root"})
export class CityService {
  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>(`${environment.apiURL}/city`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  createCity(city: CreateCity) {
    return this.http.post<City>(`${environment.apiURL}/city`, city)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  deleteCity(id: number) {
    return this.http.delete<void>(`${environment.apiURL}/city/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  getCity(id: number) {
    return this.http.get<City>(`${environment.apiURL}/city/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  updateCity(id:number, city: CreateCity) {
    return this.http.put<City>(`${environment.apiURL}/city/${id}`, city)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

}
