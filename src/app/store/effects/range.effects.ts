import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ERangeActions, SetPageInfo, SetPageInfoSuccess, SetTotalCount, SetTotalCountSuccess,
} from '../actions/range.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {PageModel} from '../../models/page.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {selectCarList, selectCarsAmount} from '../selectors/car.selector';
import {CollectionRespModel} from '../../models/collection-resp.model';


@Injectable()
export class RangeEffects {
  @Effect()
  setTotalCount$ = this.actions$.pipe(
    ofType<SetTotalCount>(ERangeActions.SetTotalCount),
    map(action => action.payload),
    switchMap((action) => {
      return of(new SetTotalCountSuccess(action));
    })
  );

  @Effect()
  setPageInfo$ = this.actions$.pipe(
    ofType<SetPageInfo>(ERangeActions.SetPageInfo),
    map(action => action.payload),
    switchMap((info: PageModel) => {
      return of(new SetPageInfoSuccess(info));
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }
}
