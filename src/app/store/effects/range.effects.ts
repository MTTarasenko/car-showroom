import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions, SetPageInfo, SetPageInfoSuccess,
} from '../actions/range.actions';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PageModel} from '../../models/page.model';


@Injectable()
export class RangeEffects {
  // @Effect()
  // setPageCount$ = this.actions$.pipe(
  //   ofType<SetPageCount>(ERangeActions.SetPageCount),
  //   map(action => action.payload),
  //   switchMap((count: number) => {
  //     return of(new SetPageCountSuccess(count));
  //   })
  // );

  @Effect()
  setPageInfo$ = this.actions$.pipe(
    ofType<SetPageInfo>(ERangeActions.SetPageInfo),
    map(action => action.payload),
    switchMap((info: PageModel) => {
      return of(new SetPageInfoSuccess(info));
    })
  );


  constructor(
    private actions$: Actions
  ) {
  }
}
