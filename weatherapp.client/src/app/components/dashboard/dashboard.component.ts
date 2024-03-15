import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { CityService } from '../../services/city.service';
import { City } from '../../interfaces/City';
import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private cityService = inject(CityService);
  private dialog = inject(MatDialog);

  createCity: CreateCity = { name: "" };
  cities: City[] = [];

  ngOnInit() {
    this.cityService.getCities().subscribe(response => this.cities = response)
  }

  onDelete(id: number) {
    this.cityService.deleteCity(id).pipe(
      switchMap(() => this.cityService.getCities())
    ).subscribe(response => this.cities = response);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {data: this.createCity});

    dialogRef.afterClosed().pipe(
      switchMap((newCity: CreateCity) => this.cityService.createCity(newCity)),
      switchMap(() => this.cityService.getCities())
    ).subscribe(response => {
      this.createCity.name = "";
      this.cities = response;
    });

  }
}
