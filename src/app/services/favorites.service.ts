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
    // this.favoriteCarsList.filter(item => item.favorite = true);
    return of(this.favoriteCarsList).pipe(distinct());
  }

  addFavorite(car?: Car): Observable<Car[]> {
    if (!this.favoriteCarsList.some(value => {
      return value.id === car.id;
    })) {
      this.favoriteCarsList.push(car);
    } else {
      this.favoriteCarsList.forEach((item, index) => {
        if (item.id === car.id) {
          this.favoriteCarsList.splice(index, 1);
        }
      });
    }
    return of(this.favoriteCarsList).pipe(distinct());
  }

  checkIfFavorite(carID): Observable<boolean> {
    return new Observable(observer => {
      this.getFavoriteCars().pipe(
        map(data => {
          if (data.find(item => item.id === carID)) {
            return observer.next(true);
          } else {
            return observer.next(false);
          }
        })
      ).subscribe();
    });
  }
}
