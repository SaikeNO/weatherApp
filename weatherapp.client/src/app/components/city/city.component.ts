import { Component, OnInit } from '@angular/core';
import { City } from '../../interfaces/City';
import { BehaviorSubject, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { CityService } from '../../services/city.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Weather } from '../../interfaces/Weather';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  city: City | null = null;
  weather: Weather | null = null;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private cityService: CityService, private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get("id");
        if (!id) return of();

        return this.cityService.getCity(Number.parseInt(id)).pipe(
          tap(() => this.isLoading$.next(true))
        );
      }),
      switchMap((city: City) => {
        this.city = city;
        return this.weatherService.getWeather(city.name)
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status == 404)
          this.router.navigate(["/"]);

        return throwError(() => e);
      })
    ).subscribe(response => {
      this.weather = response;
      this.isLoading$.next(false);
    })
  }
}
