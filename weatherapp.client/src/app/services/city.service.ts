import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { City } from "../interfaces/City";
import { CreateCity } from "../interfaces/CreateCity";
import { environment } from '../../environments/environment';

@Injectable({providedIn: "root"})
export class CityService {
  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>(`${environment.apiURL}/city`);
  }

  createCity(city: CreateCity) {
    return this.http.post<City>(`${environment.apiURL}/city`, city);
  }

  deleteCity(id: number) {
    return this.http.delete<void>(`${environment.apiURL}/city/${id}`);
  }

  getCity(id: number) {
    return this.http.get<City>(`${environment.apiURL}/city/${id}`);
  }

  updateCity(id:number, city: CreateCity) {
    return this.http.put<City>(`${environment.apiURL}/city/${id}`, city);
  }

}
