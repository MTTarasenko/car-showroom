import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Car} from '../models/car';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteCarsList: Car[] = [];

  constructor() {
  }

  getFavoriteCars(): Observable<Car[]> {
    return of(this.favoriteCarsList.map(item => ({...item}))).pipe(delay(2000));
  }

  addFavorite(car?: Car): Observable<Car> {
    return new Observable(observer => {
      if (!this.favoriteCarsList.some(value => {
        return value.id === car.id;
      })) {
        const newFavCar = {...car};
        this.favoriteCarsList.push(newFavCar);
        return observer.next(newFavCar);
      } else {
        return observer.error();
      }
    }).pipe(
      delay(2000),
      map((data: Car) => data)
    );
  }

  removeFavorite(car: Car): Observable<Car> {
    return new Observable(observer => {
      this.favoriteCarsList.forEach((item, index) => {
        if (item.id === car.id) {
          this.favoriteCarsList.splice(index, 1);
          return observer.next(car);
        }
      });
    }).pipe(
      delay(2000),
      map((data: Car) => data)
    );
  }

}
