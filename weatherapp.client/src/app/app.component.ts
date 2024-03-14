import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil} from 'rxjs';
import { CityService } from './services/city.service';
import { City } from './interfaces/City';
import { CreateCity } from './interfaces/CreateCity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    city: ['', [Validators.required, Validators.minLength(3)]]
  })

  cities: City[] = [];

  private onDestroy$ = new Subject<void>();

  constructor(private cityService:CityService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cityService.getCities()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(reponse => this.cities = reponse);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const city: CreateCity = {
      name: this.form.controls.city.value!
    }

    this.cityService.createCity(city)
      .pipe(
        switchMap(() => this.cityService.getCities()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(response => this.cities = response);

  }

  onDelete(id: number) {
    this.cityService.deleteCity(id)
      .pipe(
        switchMap(() => this.cityService.getCities()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(response => this.cities = response);
  }

}
