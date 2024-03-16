import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CityListComponent } from './components/city-list/city-list.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent,
  },
  {
    path: "city-list",
    component: CityListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
