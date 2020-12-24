import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {CarListComponent} from './pages/car-list/car-list.component';
import {CarDetailsComponent} from './pages/car-details/car-details.component';
import {AddCarModalComponent} from './components/add-car-modal/add-car-modal.component';
import {MainHeaderModule} from './components/main-header/main-header.module';
import {BasicLayoutModule} from './layout/basic-layout/basic-layout.module';
import {CarModule} from "./components/car/car.module";

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
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
        MainHeaderModule,
        BasicLayoutModule,
        CarModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
