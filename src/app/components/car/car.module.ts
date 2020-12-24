import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CarComponent],
  exports: [
    CarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class CarModule { }
