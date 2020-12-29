import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Car} from '../models/car';
import {forkJoin, Observable} from 'rxjs';
import {CarService} from './car.service';
import {FavoritesService} from './favorites.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CarListResolverService implements Resolve<Car[]> {


  constructor(private service: CarService,
              private favoriteService: FavoritesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Car[]> | Promise<Car[]> | Car[] {

    return this.service.getCarList();

    // return forkJoin([
    //   this.service.getCarList(),
    //  this.favoriteService.getFavoriteCars()]
    // ).pipe(
    //   map(([resp1, resp2]) => {
    //     resp1.map(itemC => {
    //       resp2.map(itemF => {
    //         if (itemC.id === itemF.id) {
    //           itemC.favorite = true;
    //         }
    //       });
    //     });
    //     return resp1;
    //   })
    // );
  }
}
