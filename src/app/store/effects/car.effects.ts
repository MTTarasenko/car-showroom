import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {CarService} from '../../services/car.service';
import {AppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {
  AddCar,
  AddCarSuccess, AddCarToFav, AddCarToFavSuccess,
  ECarActions,
  GetCar,
  GetCars,
  GetCarsSuccess,
  GetCarSuccess
} from '../actions/car.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectCarList} from '../selectors/car.selector';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';

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
    switchMap((cars: Car[]) => {
      return of(new GetCarsSuccess(cars));
    })
  );

  @Effect()
  addCar$ = this._actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    map(action => {
      const newCar = {...action.payload};
      // newCar.id = Math.floor(1000 + Math.random() * 9000);
      console.log(newCar);
      this._carService.addNewCar(newCar).subscribe();
      return newCar;
    }),
    switchMap((car: Car) => of(new AddCarSuccess(car)))
  );

  @Effect()
  addCarToFav = this._actions$.pipe(
    ofType<AddCarToFav>(ECarActions.AddCarToFav),
    map(action => {
      console.log(action.payload);
      this.favService.addFavorite(action.payload).subscribe();
      return action.payload;
    }),
    switchMap((car: Car) => of(new AddCarToFavSuccess(car)))
  );



  constructor(
    // tslint:disable-next-line:variable-name
    private _carService: CarService,
    private favService: FavoritesService,
    // tslint:disable-next-line:variable-name
    private _actions$: Actions,
    // tslint:disable-next-line:variable-name
    private _store: Store<AppState>
  ) {
  }
}

