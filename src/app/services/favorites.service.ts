import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import {Car} from '../models/car';
import {distinct} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteCarsList: Car[] = [];

  constructor() { }

  getFavoriteCars(): Observable<Car[]> {
    return of(this.favoriteCarsList);
  }

  addFavorite(car: Car): Observable<Car[]> {
    if (!this.favoriteCarsList.includes(car)) {
      car.favorite = true;
      this.favoriteCarsList.push(car);
    } else {
      car.favorite = false;
      this.favoriteCarsList.forEach((item, index) => {
        if (item.id === car.id) {
          this.favoriteCarsList.splice(index, 1);
        }
      });
    }
    return of(this.favoriteCarsList).pipe(distinct());
  }

}
