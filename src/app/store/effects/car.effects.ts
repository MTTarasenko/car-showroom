import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar,
  AddCarSuccess,
  ECarActions,
  GetCar,
  GetCars,
  GetCarsCount,
  GetCarsCountSuccess,
  GetCarsSuccess,
  GetCarSuccess,
} from '../actions/car.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Car} from '../../models/car';
import {selectCarList, selectRangeFrom, selectRangeTo} from '../selectors/car.selector';

@Injectable()
export class CarEffects {
  @Effect()
  getCar$ = this.actions$.pipe(
    ofType<GetCar>(ECarActions.GetCar),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([id, cars]) => {
      const selectCar = cars.filter(car => car.id === +id)[0];
      return of(new GetCarSuccess(selectCar));
    })
  );

  @Effect()
  getCars$ = this.actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    switchMap(action => {
      let from: number;
      this._store.pipe(select(selectRangeFrom)).subscribe(result => from = result);
      let to: number;
      this._store.pipe(select(selectRangeTo)).subscribe(result => to = result);
      return this._carService.getFourCarsAndLength(from, to)
        .pipe(map(data => {
          return data.cars;
        }));
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
        .pipe(map(data => {
          return data.totalCount;
        }));
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
    private _store: Store<AppState>
  ) {
  }
}

