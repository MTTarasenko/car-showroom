import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ELoginActions, GetLogin, LogOut} from '../actions/login.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {SessionService} from '../../services/session.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {ClearCarsStore} from '../actions/car.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {ClearFavStore} from '../actions/favorite.actions';


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
      this.store.dispatch(new ClearCarsStore());
      this.store.dispatch(new ClearFavStore());
      this.service.logOut();
    })
  );

  constructor(
    private actions$: Actions,
    private service: SessionService,
    private readonly router: Router,
    private store: Store<AppState>
  ) {
  }
}
