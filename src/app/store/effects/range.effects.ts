import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions, SetPageCount, SetPageCountSuccess,
  SetPageState,
  SetPageStateSuccess
} from '../actions/range.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class RangeEffects {
  @Effect()
  setPageState$ = this.actions$.pipe(
    ofType<SetPageState>(ERangeActions.SetPageState),
    map(action => action.payload),
    switchMap((index: number) => {
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
    private actions$: Actions
  ) {}
}
