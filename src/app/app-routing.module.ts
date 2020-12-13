import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'car-list',
    loadChildren: () => import('./pages/car-list/car-list.module').then(m => m.CarListModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'car-details',
    loadChildren: () => import('./pages/car-details/car-details.module').then(m => m.CarDetailsModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
