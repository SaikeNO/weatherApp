import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.css'
})
export class AddCityDialogComponent {

  city!: CreateCity;
  isEditing: boolean = false; 
  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {city: CreateCity, isEditing: boolean},
  ) {
    this.city = data.city;
    this.isEditing = data.isEditing;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
