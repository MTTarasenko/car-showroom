import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent {

  constructor(public dialogRef: MatDialogRef<AddCarModalComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
