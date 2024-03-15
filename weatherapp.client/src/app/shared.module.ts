import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';

@NgModule({
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNavList

  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNavList
  ],
})
export class SharedModule { }
