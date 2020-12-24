import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { MainHeaderComponent } from './main-header.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
// import {CarListResolverService} from "../../services/car-list-resolver.service";



@NgModule({
  declarations: [MainHeaderComponent],
  exports: [
    MainHeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule
    ]
})
export class MainHeaderModule { }
