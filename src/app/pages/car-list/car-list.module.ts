import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { CarListComponent } from './car-list.component';
import {CarListResolverService} from '../../services/car-list-resolver.service';
import {MainHeaderModule} from '../../components/main-header/main-header.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainHeaderModule,
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
