import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteCarsIDList: number[] = [];

  constructor() {
  }

  getFavoriteCars(newFavCars?: number[]): Observable<number[]> {
    // console.log('fav cars init', this.favoriteCarsIDList);
    if (!!newFavCars && !!newFavCars.length) {
      this.favoriteCarsIDList = newFavCars;
    } else {
      this.favoriteCarsIDList = [];
    }
    return of(([...this.favoriteCarsIDList])
    ).pipe(delay(1000));
  }

  addFavorite(carID: number): Observable<number[]> {
    return new Observable(observer => {
      if (!this.favoriteCarsIDList.some(value => {
        return value === carID;
      })) {
        this.favoriteCarsIDList.push(carID);
        return observer.next(this.favoriteCarsIDList);
      }
    }).pipe(
      delay(1000),
      map((data: number[]) => data)
    );
  }

  removeFavorite(carID: number): Observable<number[]> {
    return new Observable(observer => {
      this.favoriteCarsIDList.forEach((item, index) => {
        if (item === carID) {
          this.favoriteCarsIDList.splice(index, 1);
          return observer.next(this.favoriteCarsIDList);
        }
      });
    }).pipe(
      delay(1000),
      map((data: number[]) => data)
    );
  }

}
