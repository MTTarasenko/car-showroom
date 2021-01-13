import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectCarYears} from '../../store/selectors/car.selector';
import {GetCarYears} from '../../store/actions/car.actions';


@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent implements OnInit {

  newCarForm: FormGroup;
  carYears$ = this.store.pipe(select(selectCarYears));

  constructor(public dialogRef: MatDialogRef<AddCarModalComponent>,
              private fb: FormBuilder,
              private service: CarService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCarYears());


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
