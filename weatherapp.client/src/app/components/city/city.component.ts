import { Component, Input, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError} from 'rxjs';

import { WeatherService } from '../../services/weather.service';

import { Weather } from '../../interfaces/Weather';
import { City } from '../../interfaces/City';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  weatherService = inject(WeatherService);

  @Input({required: true}) city!: City;
  weather$!: Observable<Weather>;

  isError$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.weather$ = this.weatherService.getWeather(this.city.name).pipe(
      catchError((error: HttpErrorResponse) => {
        this.isError$.next(true);
        return throwError(() => error);
      })
    );
  }
}
