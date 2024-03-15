import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { City } from '../../interfaces/City';
import { CityService } from '../../services/city.service';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form = this.formBuilder.group({
    city: ['', [Validators.required, Validators.minLength(3)]]
  })

  cities: City[] = [];

  private onDestroy$ = new Subject<void>();

  constructor(private cityService: CityService, private formBuilder: FormBuilder) { }

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
      .subscribe(response => {
        this.form.reset();
        this.cities = response
      });

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
