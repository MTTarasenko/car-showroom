import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Car} from '../models/car';
import {Observable} from 'rxjs';
import {CarService} from './car.service';

@Injectable()
export class CarListResolverService implements Resolve<Car[]> {


  constructor(private service: CarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Car[]> | Promise<Car[]> | Car[] {
    return this.service.getCarList();
  }
}
