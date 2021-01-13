import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddCarToFav,
  EFavoriteActions, GetFavCarList, GetFavCarListSuccess,
  RemoveCarFromFav
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

  @Effect({dispatch: false})
  addCarToFav = this.actions$.pipe(
    ofType<AddCarToFav>(EFavoriteActions.AddCarToFav),
    switchMap(action => {
      return this.favService.addFavorite(action.payload)
        .pipe(map(data => data));
    })
  );

  @Effect({dispatch: false})
  removeCarFromFav = this.actions$.pipe(
    ofType<RemoveCarFromFav>(EFavoriteActions.RemoveCarFromFav),
    throttleTime(700),
    switchMap(action => {
      return this.favService.removeFavorite(action.payload)
        .pipe(map(data => data));
    })
  );


  constructor(
    private actions$: Actions,
    private favService: FavoritesService,
  ) {
  }

}
