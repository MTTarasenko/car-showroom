import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CarListComponent} from './pages/car-list/car-list.component';
import {CarDetailsComponent} from './pages/car-details/car-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AddCarModalComponent} from './components/add-car-modal/add-car-modal.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarListComponent,
    CarDetailsComponent,
    AddCarModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
