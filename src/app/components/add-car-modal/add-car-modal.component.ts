import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent implements OnInit{

  newCarForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCarModalComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCarForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      photoURl: ['', [
        Validators.required,
        // Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')
      ]],
      year: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
    });

    this.newCarForm.valueChanges.subscribe(console.log);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
