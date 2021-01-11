import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions,
  GetRangeFrom,
  GetRangeFromSuccess,
  GetRangeTo,
  GetRangeToSuccess
} from '../actions/range.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class RangeEffects {
  @Effect()
  getRangeFrom$ = this.actions$.pipe(
    ofType<GetRangeFrom>(ERangeActions.GetRangeFrom),
    map(action => action.payload),
    switchMap((from: number) => {
      return of(new GetRangeFromSuccess(from));
    })
  );

  @Effect()
  getRangeTo$ = this.actions$.pipe(
    ofType<GetRangeTo>(ERangeActions.GetRangeTo),
    map(action => action.payload),
    switchMap((to: number) => {
      return of(new GetRangeToSuccess(to));
    })
  );


  constructor(
    private actions$: Actions,
  ) {
  }

}
