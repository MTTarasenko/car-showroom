import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {ECarActions, GetCar, GetCars, GetCarsSuccess, GetCarSuccess} from '../actions/car.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectCarList} from '../selectors/car.selector';
import {Car} from '../../models/car';

@Injectable()
export class CarEffects {
  @Effect()
  getCar$ = this._actions$.pipe(
    ofType<GetCar>(ECarActions.GetCar),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([id, cars]) => {
      const selectCar = cars.filter(car => car.id === +id)[0];
      return of(new GetCarSuccess(selectCar));
    })
  );

  @Effect()
  getCars$ = this._actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    switchMap(() => this._carService.getCarList()),
    switchMap((cars: Car[]) => of(new GetCarsSuccess(cars)))
  );



  constructor(
    // tslint:disable-next-line:variable-name
    private _carService: CarService,
    // tslint:disable-next-line:variable-name
    private _actions$: Actions,
    // tslint:disable-next-line:variable-name
    private _store: Store<AppState>
  ) {
  }
}

