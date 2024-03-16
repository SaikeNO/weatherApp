import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrl: './city-dialog.component.css'
})
export class CityDialogComponent {

  city!: CreateCity;
  isEditing: boolean = false; 
  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {city: CreateCity, isEditing: boolean},
  ) {
    this.city = data.city;
    this.isEditing = data.isEditing;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
