import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { CityService } from '../../services/city.service';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';

import { City } from '../../interfaces/City';
import { CreateCity } from '../../interfaces/CreateCity';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private cityService = inject(CityService);
  private dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver);

  private onDestroy$ = new Subject<void>();
  public createCity: CreateCity = { name: "" };
  public cities: City[] = [];

  public cols$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => matches ? 1 : 2)
  )

  ngOnInit() {
    this.cityService.getCities()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => this.cities = response.reverse())
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onDelete(id: number) {
    this.cityService.deleteCity(id).pipe(
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => this.cities = response.reverse());
  }

  onEdit(city: City) {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: {
        city: { ...city },
        isEditing: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((response: City) => response.alias != city.alias),
      switchMap((city) => this.cityService.updateCity(city.id, city)),
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => this.cities = response.reverse());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: {
        city: { ...this.createCity }
      }
    });

    dialogRef.afterClosed().pipe(
      filter((response: CreateCity) => !!response.name),
      switchMap((newCity) => this.cityService.createCity(newCity)),
      switchMap(() => this.cityService.getCities()),
      takeUntil(this.onDestroy$)
    ).subscribe(response => {
      this.createCity.name = "";
      this.createCity.alias = "";
      this.cities = response.reverse();
    });

  }
}
