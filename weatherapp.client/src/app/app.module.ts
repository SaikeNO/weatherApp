import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { CityComponent } from './components/city/city.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CityDialogComponent } from './components/city-dialog/city-dialog.component';
import { CityListComponent } from './components/city-list/city-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CityDialogComponent,
    CityListComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
