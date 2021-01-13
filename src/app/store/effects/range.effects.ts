import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions, SetPageInfo, SetPageInfoSuccess
} from '../actions/range.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PageModel} from '../../models/page.model';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {GetCars} from '../actions/car.actions';


@Injectable()
export class RangeEffects {
  @Effect()
  setPageInfo$ = this.actions$.pipe(
    ofType<SetPageInfo>(ERangeActions.SetPageInfo),
    map(() => {
      this.store.dispatch(new GetCars());
    }),
    switchMap(() => {
      return of(new SetPageInfoSuccess());
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {
  }
}
