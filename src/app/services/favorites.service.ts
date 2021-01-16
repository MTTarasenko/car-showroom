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
    console.log('fav cars init');
    // localStorage.setItem('favorite cars', JSON.stringify(this.favoriteCarsList));
    let favCarsFromLS;
    if (!!localStorage.getItem('favorite cars')) {
      favCarsFromLS = JSON.parse(localStorage.getItem('favorite cars'));
    } else {
      favCarsFromLS = [];
    }
    return of(this.favoriteCarsList
      .map(item => ({...item})))
      .pipe(delay(1000));
  }

  addFavorite(car?: Car): Observable<Car> {
    return new Observable(observer => {
      if (!this.favoriteCarsList.some(value => {
        return value.id === car.id;
      })) {
        const newFavCar = {...car};
        this.favoriteCarsList.push(newFavCar);
        localStorage.setItem('favorite cars', JSON.stringify(this.favoriteCarsList));
        return observer.next(newFavCar);
      }
      // localStorage.setItem('favorite cars', JSON.stringify(this.favoriteCarsList));
    }).pipe(
      delay(1000),
      map((data: Car) => data)
    );
  }

  removeFavorite(car: Car): Observable<Car> {
    return new Observable(observer => {
      this.favoriteCarsList.forEach((item, index) => {
        if (item.id === car.id) {
          this.favoriteCarsList.splice(index, 1);
          localStorage.setItem('favorite cars', JSON.stringify(this.favoriteCarsList));
          return observer.next(car);
        }
        // localStorage.setItem('favorite cars', JSON.stringify(this.favoriteCarsList));
      });
    }).pipe(
      delay(1000),
      map((data: Car) => data)
    );
  }

}
