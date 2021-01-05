import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CarDetailsComponent} from './car-details.component';
import {GetCarByIdResolverService} from '../../services/get-car-by-id-resolver.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      resolve: {
        carById: GetCarByIdResolverService
      },
      component: CarDetailsComponent
    }])
  ],
  providers: [
    GetCarByIdResolverService
  ]
})
export class CarDetailsModule {
}
