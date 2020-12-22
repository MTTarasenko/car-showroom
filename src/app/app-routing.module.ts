import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService} from './guards/auth-guard.service';
import {BasicLayoutComponent} from './layout/basic-layout/basic-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: BasicLayoutComponent,
    children: [
      {
        path: 'car-list',
        loadChildren: () => import('./pages/car-list/car-list.module').then(m => m.CarListModule),
      },
      {
        path: 'car-details/:id',
        loadChildren: () => import('./pages/car-details/car-details.module').then(m => m.CarDetailsModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
