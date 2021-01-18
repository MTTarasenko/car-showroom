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

  getFavoriteCars(): Observable<number[]> {
    console.log('fav cars init');
    const favCarsFromLS = localStorage.getItem('favorite_cars_ids');
    if (!!favCarsFromLS) {
      this.favoriteCarsIDList = JSON.parse(favCarsFromLS);
    } else {
      this.favoriteCarsIDList = [];
    }
    return of(([...this.favoriteCarsIDList])
    ).pipe(delay(1000));
  }

  addFavorite(carID: number): Observable<number> {
    return new Observable(observer => {
      if (!this.favoriteCarsIDList.some(value => {
        return value === carID;
      })) {
        this.favoriteCarsIDList.push(carID);
        localStorage.setItem('favorite_cars_ids', JSON.stringify(this.favoriteCarsIDList));
        return observer.next(carID);
      }
    }).pipe(
      delay(1000),
      map((data: number) => data)
    );
  }

  removeFavorite(carID: number): Observable<number> {
    return new Observable(observer => {
      this.favoriteCarsIDList.forEach((item, index) => {
        if (item === carID) {
          this.favoriteCarsIDList.splice(index, 1);
          localStorage.setItem('favorite_cars_ids', JSON.stringify(this.favoriteCarsIDList));
          return observer.next(carID);
        }
      });
    }).pipe(
      delay(1000),
      map((data: number) => data)
    );
  }

}
