import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../interfaces/City";
import { catchError, throwError } from "rxjs";
import { CreateCity } from "../interfaces/CreateCity";

@Injectable({providedIn: "root"})
export class CityService {
  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>("/api/city")
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  createCity(city: CreateCity) {
    return this.http.post<City>("api/city", city)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  deleteCity(id: number) {
    return this.http.delete<void>(`api/city/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

  getCity(id: number) {
    return this.http.get<City>(`/api/city/${id}`)
      .pipe(catchError((e: HttpErrorResponse) => throwError(() => e)));
  }

}
