import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Car} from '../models/car';
import {distinct, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteCarsList: Car[] = [];

  constructor() {
  }

  getFavoriteCars(): Observable<Car[]> {
    return of(this.favoriteCarsList);
  }

  addFavorite(car?: Car): Observable<Car> {
    return new Observable(observer => {
      if (!this.favoriteCarsList.some(value => {
        return value.id === car.id;
      })) {
        this.favoriteCarsList.push(car);
        return observer.next(car);
      } else {
        return observer.error();
      }
    });
  }

  removeFavorite(car: Car): Observable<Car> {
    return new Observable(observer => {
      this.favoriteCarsList.forEach((item, index) => {
        if (item.id === car.id) {
          this.favoriteCarsList.splice(index, 1);
          return observer.next(car);
        }
      });
    });
  }

}
