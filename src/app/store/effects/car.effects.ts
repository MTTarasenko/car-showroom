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
  GetCarsCount,
  GetCarsCountSuccess,
  GetCarsSuccess,
  GetCarSuccess,
} from '../actions/car.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {Car} from '../../models/car';
import {selectCarList, selectRangeFrom, selectRangeTo} from '../selectors/car.selector';
import {Router} from '@angular/router';

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
    withLatestFrom(zip(
      this._store.pipe(select(selectRangeFrom)),
      this._store.pipe(select(selectRangeTo))
    )),
    switchMap(([action, range]) => {
      return this._carService.getFourCarsAndLength(range[0], range[1])
        .pipe(map(data => data.cars));
    }),
    switchMap((info: Car[]) => {
      return of(new GetCarsSuccess(info));
    })
  );

  @Effect()
  getCarsCount$ = this.actions$.pipe(
    ofType<GetCarsCount>(ECarActions.GetCarsCount),
    switchMap(action => {
      return this._carService.getFourCarsAndLength()
        .pipe(map(data => data.totalCount));
    }),
    switchMap((info: number) => {
      return of(new GetCarsCountSuccess(info));
    })
  );

  @Effect()
  addCar$ = this.actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    map(action => {
      const newCar = {...action.payload};
      this._carService.addNewCar(newCar).subscribe();
      return newCar;
    }),
    switchMap((car: Car) => of(new AddCarSuccess(car)))
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

