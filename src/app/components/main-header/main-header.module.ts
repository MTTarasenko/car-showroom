import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { MainHeaderComponent } from './main-header.component';
// import {CarListResolverService} from "../../services/car-list-resolver.service";



@NgModule({
  declarations: [MainHeaderComponent],
  exports: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MainHeaderModule { }
