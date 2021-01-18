import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar,
  ECarActions,
  GetCars,
  GetCarsSuccess, GetPageInfo, SetLoading, SetPageInfo,
} from '../actions/car.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {selectPageState} from '../selectors/car-list.selector';
import {CollectionRespModel} from '../../models/collection-resp.model';
import {selectFavCarsList} from '../selectors/favorite.selectors';
import {Car} from '../../models/car';

@Injectable()
export class CarListEffects {
  @Effect()
  getCars$ = this.actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    switchMap(() => {
      return this.store.pipe(select(selectPageState));
    }),
    switchMap((info) => {
      // TODO start showing spinner
      this.store.dispatch(new SetLoading(true));
      const from = (info.pageSize * info.pageIndex);
      const to = info.pageSize * (info.pageIndex + 1);
      return zip(
        this.carService.getFourCarsAndLength(from, to)
          .pipe(map(data => data)),
        this.store.pipe(select(selectFavCarsList))
      ).pipe(map(([resp, favCars]) => {
        resp.list.map(car => {
          favCars.map(favoriteCar => {
            if (car.id === favoriteCar) {
              car.favorite = true;
            }
          });
        });
        return resp;
      }));
    }),
    switchMap((info: CollectionRespModel<Car>) => {
      return of(new GetCarsSuccess(info));
    })
  );

  @Effect({dispatch: false})
  addCar$ = this.actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    switchMap(action => {
      this.store.dispatch(new SetLoading(true));
      const newCar = {...action.payload};
      return this.carService.addNewCar(newCar)
        .pipe(map(data => data));
    }),
    tap(() => {
      this.store.dispatch(new GetCars());
    })
  );

  @Effect({dispatch: false})
  setPageInfo$ = this.actions$.pipe(
    ofType<SetPageInfo>(ECarActions.SetPageInfo),
    tap((action) => {
      const newFrom = action.payload.pageIndex;
      const newTo = action.payload.pageSize;
      localStorage.setItem('pagination_state', JSON.stringify([newFrom, newTo]));
      this.store.dispatch(new GetCars());
    })
  );

  @Effect({dispatch: false})
  getPageInfo = this.actions$.pipe(
    ofType<GetPageInfo>(ECarActions.GetPageInfo),
    tap(() => {
      const paginationFromLS = localStorage.getItem('pagination_state');
      if (!!paginationFromLS) {
        this.store.dispatch(new SetPageInfo({
          pageIndex: JSON.parse(paginationFromLS)[0],
          pageSize: JSON.parse(paginationFromLS)[1]
        }));
      }
    })
  );

  constructor(
    private carService: CarService,
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }
}

