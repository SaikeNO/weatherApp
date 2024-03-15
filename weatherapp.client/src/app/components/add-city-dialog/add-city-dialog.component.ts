import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCity } from '../../interfaces/CreateCity';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.css'
})
export class AddCityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public city: CreateCity,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
