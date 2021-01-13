import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar,
  AddCarSuccess,
  ECarActions,
  GetCar, GetCarError,
  GetCars,
  GetCarsSuccess,
  GetCarSuccess, GetCarYears, GetCarYearsSuccess,
} from '../actions/car.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {Car} from '../../models/car';
import {selectPageCount, selectPageInfo} from '../selectors/range.selectors';
import {Router} from '@angular/router';
import {selectCarList} from '../selectors/car.selector';
import {CollectionRespModel} from '../../models/collection-resp.model';
import {selectFavCarsList} from '../selectors/favorite.selectors';

@Injectable()
export class CarEffects {
  @Effect()
  getCar$ = this.actions$.pipe(
    ofType<GetCar>(ECarActions.GetCar),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
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
    // withLatestFrom(this._store.pipe(select(selectPageState))),
    withLatestFrom(this._store.pipe(select(selectPageInfo))),
    switchMap(([action, info]) => {
      const from = (info.pageSize * info.pageIndex);
      const to = info.pageSize * (info.pageIndex + 1);
      return zip(
        this._carService.getFourCarsAndLength(from, to)
          .pipe(map(data => data)),
        this._store.pipe(select(selectFavCarsList))
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

  @Effect()
  addCar$ = this.actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    switchMap(action => {
      const newCar = {...action.payload};
      this._store.dispatch(new GetCars());
      return this._carService.addNewCar(newCar).pipe(map(data => data));
    }),
    switchMap((car: Car) => of(new AddCarSuccess(car)))
  );

  @Effect()
  getCarYears$ = this.actions$.pipe(
    ofType<GetCarYears>(ECarActions.GetCarYears),
    switchMap(() => {
      return this._carService.getCarYears().pipe(map(data => data));
    }),
    switchMap((years: number[]) => {
      return of(new GetCarYearsSuccess(years));
    })
  );

  constructor(
    // tslint:disable-next-line:variable-name
    private _carService: CarService,
    private actions$: Actions,
    // tslint:disable-next-line:variable-name
    private _store: Store<AppState>,
    private readonly router: Router
  ) {
  }
}

