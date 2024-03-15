import { Component, OnInit, inject } from '@angular/core';
import { CityService } from '../../services/city.service';
import { switchMap } from 'rxjs';
import { City } from '../../interfaces/City';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private cityService = inject(CityService);

  cities: City[] = [];

  ngOnInit() {
    this.cityService.getCities().subscribe(response => this.cities = response)
  }

  onDelete(id: number) {
    this.cityService.deleteCity(id).pipe(
      switchMap(() => this.cityService.getCities())
    ).subscribe(response => this.cities = response);
  }
}
