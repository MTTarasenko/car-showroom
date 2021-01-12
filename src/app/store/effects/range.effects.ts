import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions, SetPageCount, SetPageCountSuccess,
  SetPageState,
  SetPageStateSuccess
} from '../actions/range.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GetCars} from '../actions/car.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';


@Injectable()
export class RangeEffects {
  @Effect()
  setPageState$ = this.actions$.pipe(
    ofType<SetPageState>(ERangeActions.SetPageState),
    map(action => action.payload),
    switchMap((index: number) => {
      this.store.dispatch(new GetCars());
      return of(new SetPageStateSuccess(index));
    })
  );

  @Effect()
  setPageCount$ = this.actions$.pipe(
    ofType<SetPageCount>(ERangeActions.SetPageCount),
    map(action => action.payload),
    switchMap((count: number) => {
      return of(new SetPageCountSuccess(count));
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
