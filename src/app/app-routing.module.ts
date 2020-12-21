import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService} from './guards/auth-guard.service';
import {CarListResolverService} from './services/car-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'car-list',
        resolve: {cars: CarListResolverService},
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
