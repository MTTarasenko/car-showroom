import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Car} from '../models/car';
import {Observable} from 'rxjs';
import {ServerEmulatorService} from './server-emulator.service';
import {CarListModule} from "../pages/car-list/car-list.module";

@Injectable()
export class CarListResolverService implements Resolve<Car[]> {

  cars: Car[];

  constructor(private service: ServerEmulatorService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Car[]> | Promise<Car[]> | Car[] {
    return this.service.getCarList();
  }
}
