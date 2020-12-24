import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [CarComponent],
  exports: [
    CarComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class CarModule { }
