import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar, ClearCarsStore,
  ECarActions,
  GetCars,
  GetCarsSuccess, SetLoading, SetPageInfo,
} from '../actions/car.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
    withLatestFrom(this.store.pipe(select(selectPageState))),
    switchMap(([action, info]) => {
      // TODO start showing spinner
      this.store.dispatch(new SetLoading(true));
      const from = (info.pageSize * info.pageIndex);
      const to = info.pageSize * (info.pageIndex + 1);
      return zip(
        this.carService.getFourCarsAndLength(from, to)
          .pipe(map(data => data)),
        this.store.pipe(select(selectFavCarsList))
      ).pipe(map(([resp, favCars]) => {
        // this.store.dispatch(new SetLoading(false));
        // const localStoreFavCars = JSON.parse(localStorage.getItem('favorite cars'));
        // if (localStoreFavCars && localStoreFavCars.length > 0) {
        //   console.log('got cars in local store');
        // } else {
        //   console.log('no cars in local store');
        // }
        resp.list.map(car => {
          favCars.map(favoriteCar => {
            if (car.id === favoriteCar.id) {
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
    tap(() => {
      this.store.dispatch(new GetCars());
    })
  );

  constructor(
    private carService: CarService,
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }
}

