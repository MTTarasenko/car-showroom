import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddCarToFav, AddCarToFavSuccess,
  EFavoriteActions, GetFavCarList, GetFavCarListSuccess,
  RemoveCarFromFav, RemoveCarFromFavSuccess
} from '../actions/favorite.actions';
import {map, switchMap, throttleTime} from 'rxjs/operators';
import {of} from 'rxjs';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';


@Injectable()
export class FavoriteEffects {
  @Effect()
  getFavCarList = this.actions$.pipe(
    ofType<GetFavCarList>(EFavoriteActions.GetFavCarList),
    switchMap(() => {
      return this.favService.getFavoriteCars().pipe(map(data => data));
    }),
    switchMap((cars: Car[]) => {
      return of(new GetFavCarListSuccess(cars));
    })
  );

  @Effect()
  addCarToFav = this.actions$.pipe(
    ofType<AddCarToFav>(EFavoriteActions.AddCarToFav),
    switchMap(action => {
      const newFavCar = {...action.payload};
      return this.favService.addFavorite(newFavCar).pipe(map(data => data));
    }),
    switchMap((car: Car) => of(new AddCarToFavSuccess(car)))
  );

  @Effect()
  removeCarFromFav = this.actions$.pipe(
    ofType<RemoveCarFromFav>(EFavoriteActions.RemoveCarFromFav),
    throttleTime(700),
    switchMap(action => {
      return this.favService.removeFavorite(action.payload).pipe(map(data => data));
    }),
    switchMap((car: Car) => of(new RemoveCarFromFavSuccess(car)))
  );


  constructor(
    private actions$: Actions,
    private favService: FavoritesService,
  ) {
  }

}
