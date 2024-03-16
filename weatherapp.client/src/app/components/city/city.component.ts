import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, takeUntil, throwError} from 'rxjs';

import { WeatherService } from '../../services/weather.service';

import { Weather } from '../../interfaces/Weather';
import { City } from '../../interfaces/City';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit, OnDestroy {
  private weatherService = inject(WeatherService);
  private onDestroy$ = new Subject<void>();

  @Input({required: true}) city!: City;
  weather$!: Observable<Weather>;

  public isError$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.weather$ = this.weatherService.getWeather(this.city.name).pipe(
      takeUntil(this.onDestroy$),
      catchError((error: HttpErrorResponse) => {
        this.isError$.next(true);
        return throwError(() => error);
      })
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
