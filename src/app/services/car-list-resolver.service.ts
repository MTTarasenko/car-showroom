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

    // return forkJoin({
    //   cars: this.service.getCarList(),
    //   favCars: this.favoriteService.getFavoriteCars(),
    // }).pipe(
    //   map(response => {
    //     response.cars.map(itemC => {
    //       response.favCars.map(itemF => {
    //         if (itemC.id === itemF.id) {
    //           itemC.favorite = true;
    //         }
    //       });
    //     });
    //     return response.cars;
    //   })
    // );
  }
}
