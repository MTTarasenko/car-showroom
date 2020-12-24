import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { CarListComponent } from './car-list.component';
import {CarListResolverService} from '../../services/car-list-resolver.service';
import {CarModule} from '../../components/car/car.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarModule,
    RouterModule.forChild([{
      path: '',
      resolve: {cars: CarListResolverService},
      component: CarListComponent
    }])
  ],
  providers: [
    CarListResolverService
  ]
})
export class CarListModule { }
