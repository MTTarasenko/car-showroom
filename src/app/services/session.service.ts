import {Injectable} from '@angular/core';
import {Car} from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  checkUsernameAndPassword(uname: string, pwd: string): boolean {
    if (uname === 'admin' && pwd === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    } else {
      return false;
    }
  }

  saveFavorites(cars): void {
    localStorage.setItem('favorites', JSON.stringify(cars));
  }

  getFavorites(): Car[] {
    if (localStorage.getItem('favorites')) {
      console.log('true');
      return JSON.parse(localStorage.getItem('favorites'));
    } else {
      return [];
    }
}
}
