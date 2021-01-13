import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent implements OnInit {

  newCarForm: FormGroup;
  carYears$: Observable<number[]>;

  constructor(public dialogRef: MatDialogRef<AddCarModalComponent>,
              private fb: FormBuilder,
              private service: CarService) {
  }

  ngOnInit(): void {
    this.carYears$ = this.service.getCarYears();


    this.newCarForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      photoURL: ['', [
        Validators.required,
        Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')
      ]],
      year: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.dialogRef.close(this.newCarForm.value);
  }
}
