import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CityService } from '../../services/city.service';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';

import { City } from '../../interfaces/City';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private cityService = inject(CityService);
  private dialog = inject(MatDialog);

  private onDestroy$ = new Subject<void>();
  public createCity: CreateCity = { name: "" };
  public cities: City[] = [];


  ngOnInit() {
    this.cityService.getCities()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => this.cities = response)
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onDelete(id: number) {
    this.cityService.deleteCity(id).pipe(
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => this.cities = response);
  }

  onEdit(city: City) {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: {
        city,
        isEditing: true,
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap((city: City) => this.cityService.updateCity(city.id, city)),
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => this.cities = response);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: {
        city: this.createCity
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap((newCity: CreateCity) => this.cityService.createCity(newCity)),
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => {
      this.createCity.name = "";
      this.createCity.alias = "";
      this.cities = response;
    });

  }
}
