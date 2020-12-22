import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout.component';
import {MainHeaderModule} from "../../components/main-header/main-header.module";
import {RouterModule} from "@angular/router";



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
