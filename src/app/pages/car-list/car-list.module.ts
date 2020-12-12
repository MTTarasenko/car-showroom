import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car-list.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CarListComponent
    }])
  ]
})
export class CarListModule { }
