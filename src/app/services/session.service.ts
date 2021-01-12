import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private routes: Router) {
  }

  checkUsernameAndPassword(uname: string, pwd: string): boolean {
    if (uname === 'admin' && pwd === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    } else {
      return false;
    }
  }

  logOut(): void {
    localStorage.clear();
    this.routes.navigate(['']);
  }

}
