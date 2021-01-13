import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar,
  ECarActions,
  GetCar, GetCarError,
  GetCars,
  GetCarsSuccess,
  GetCarSuccess, SetPageInfo,
} from '../actions/car.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {Router} from '@angular/router';
import {selectCarList, selectPageState} from '../selectors/car.selector';
import {CollectionRespModel} from '../../models/collection-resp.model';
import {selectFavCarsList} from '../selectors/favorite.selectors';

@Injectable()
export class CarEffects {
  @Effect()
  getCar$ = this.actions$.pipe(
    ofType<GetCar>(ECarActions.GetCar),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectCarList))),
    switchMap(([id, cars]) => {
      const selectCar = cars.filter(car => car.id === +id)[0];
      if (selectCar) {
        return of(new GetCarSuccess(selectCar));
      } else {
        this.router.navigate(['/car-list/']);
        return of(new GetCarError());
      }
    })
  );

  @Effect()
  getCars$ = this.actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    withLatestFrom(this.store.pipe(select(selectPageState))),
    switchMap(([action, info]) => {
      const from = (info.pageSize * info.pageIndex);
      const to = info.pageSize * (info.pageIndex + 1);
      return zip(
        this.carService.getFourCarsAndLength(from, to)
          .pipe(map(data => data)),
        this.store.pipe(select(selectFavCarsList))
      ).pipe(map(([resp, favCars]) => {
        resp.cars.map(car => {
          favCars.map(favoriteCar => {
            if (car.id === favoriteCar.id) {
              car.favorite = true;
            }
          });
        });
        return resp;
      }));
    }),
    switchMap((info: CollectionRespModel) => {
      return of(new GetCarsSuccess(info));
    })
  );

  @Effect({dispatch: false})
  addCar$ = this.actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    switchMap(action => {
      const newCar = {...action.payload};
      this.store.dispatch(new GetCars());
      return this.carService.addNewCar(newCar).pipe(map(data => data));
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
    private readonly router: Router
  ) {
  }
}

