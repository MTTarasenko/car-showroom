import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private routes: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('username') != null) {
      this.loggedIn.next(true);
      return true;
    } else {
      this.loggedIn.next(false);
      this.routes.navigate(['']);
      return false;
    }
  }

  logOut(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.routes.navigate(['']);
  }
}
