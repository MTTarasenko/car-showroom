import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ELoginActions, GetLogin, GetLoginSuccess, LogOut, LogOutSuccess} from '../actions/login.actions';
import {map, switchMap} from 'rxjs/operators';
import {SessionService} from '../../services/session.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class LoginEffects {
  @Effect()
  getLogin$ = this.actions$.pipe(
    ofType<GetLogin>(ELoginActions.GetLogin),
    map(action => {
      const result = this.service.checkUsernameAndPassword(action.payload[0], action.payload[1]);
      if (result) {
        this.router.navigate(['/car-list']);
        return [action.payload[0], action.payload[1]];
      } else {
        alert('Error: Check username and/or password');
      }
    }),
    switchMap((result) => of(new GetLoginSuccess(result)))
  );

  @Effect()
  logOut = this.actions$.pipe(
    ofType<LogOut>(ELoginActions.LogOut),
    map(() => {
      this.service.logOut();
    }),
    switchMap(() => of(new LogOutSuccess()))
  );

    constructor(
      private actions$: Actions,
      private service: SessionService,
      private readonly router: Router
) {}
}
