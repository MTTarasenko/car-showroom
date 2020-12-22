import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { BasicLayoutComponent } from './basic-layout.component';
import {MainHeaderModule} from '../../components/main-header/main-header.module';


@NgModule({
    declarations: [BasicLayoutComponent],
    exports: [
        BasicLayoutComponent
    ],
  imports: [
    CommonModule,
    MainHeaderModule,
    RouterModule
  ]
})
export class BasicLayoutModule { }
