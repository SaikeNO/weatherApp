import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CityComponent } from './components/city/city.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityComponent,
    PageNotFoundComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
