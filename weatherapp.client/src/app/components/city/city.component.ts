import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable} from 'rxjs';

import { WeatherService } from '../../services/weather.service';

import { Weather } from '../../interfaces/Weather';
import { City } from '../../interfaces/City';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  weatherService = inject(WeatherService);

  @Input({required: true}) city!: City;
  weather$!: Observable<Weather>;

  ngOnInit() {
    this.weather$ = this.weatherService.getWeather(this.city.name);
  }
}
