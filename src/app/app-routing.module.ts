import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'car-list',
    loadChildren: () => import('./pages/car-list/car-list.module').then(m => m.CarListModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
