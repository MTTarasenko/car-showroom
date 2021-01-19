import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ELoginActions, GetLogin, LogOut} from '../actions/login.actions';
import {tap} from 'rxjs/operators';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';


@Injectable()
export class LoginEffects {
  @Effect({dispatch: false})
  getLogin$ = this.actions$.pipe(
    ofType<GetLogin>(ELoginActions.GetLogin),
    tap(action => {
      const result = this.service.checkUsernameAndPassword(action.payload.username, action.payload.password);
      if (result) {
        this.router.navigate(['/car-list']);
      } else {
        alert('Error: Check username and/or password');
      }
    })
  );

  @Effect({dispatch: false})
  logOut = this.actions$.pipe(
    ofType<LogOut>(ELoginActions.LogOut),
    tap(() => {
      this.service.logOut();
    })
  );

  constructor(
    private actions$: Actions,
    private service: SessionService,
    private readonly router: Router,
  ) {
  }
}
