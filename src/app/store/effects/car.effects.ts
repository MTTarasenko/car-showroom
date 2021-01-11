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
  GetCars, GetCarsCount, GetCarsCountSuccess,
  GetCarsSuccess,
  GetCarSuccess, RemoveCarFromFavSuccess
} from '../actions/car.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';

@Injectable()
export class CarEffects {
  // @Effect()
  // getCar$ = this._actions$.pipe(
  //   ofType<GetCar>(ECarActions.GetCar),
  //   map(action => action.payload),
  //   withLatestFrom(this._store.pipe(select(selectCarList))),
  //   switchMap(([id, cars]) => {
  //     const selectCar = cars.filter(car => car.id === +id)[0];
  //     return of(new GetCarSuccess(selectCar));
  //   })
  // );

  @Effect()
  getCars$ = this._actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    switchMap(action => {
      return this._carService.getFourCarsAndLength(action.payload[0], action.payload[1])
        .pipe(map(data => {
          return data.cars;
        }));
    }),
    switchMap((info: Car[]) => {
      return of(new GetCarsSuccess(info));
    })
  );

  @Effect()
  getCarsCount$ = this._actions$.pipe(
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
  addCar$ = this._actions$.pipe(
    ofType<AddCar>(ECarActions.AddCar),
    map(action => {
      const newCar = {...action.payload};
      this._carService.addNewCar(newCar).subscribe();
      return newCar;
    }),
    switchMap((car: Car) => of(new AddCarSuccess(car)))
  );

  @Effect()
  addCarToFav = this._actions$.pipe(
    ofType<AddCarToFav>(ECarActions.AddCarToFav),
    map(action => {
      this.favService.addFavorite(action.payload).subscribe();
      return action.payload;
    }),
    switchMap((car: Car) => of(new AddCarToFavSuccess(car)))
  );

  @Effect()
  removeCarFromFav = this._actions$.pipe(
    ofType<AddCarToFav>(ECarActions.RemoveCarFromFav),
    map(action => {
      this.favService.removeFavorite(action.payload).subscribe();
      return action.payload;
    }),
    switchMap((car: Car) => of(new RemoveCarFromFavSuccess(car)))
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

