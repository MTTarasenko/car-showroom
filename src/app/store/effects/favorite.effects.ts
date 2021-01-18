import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {map, switchMap, tap, throttleTime} from 'rxjs/operators';

import {
  AddCarToFav,
  EFavoriteActions, GetFavCarList, GetFavCarListSuccess,
  RemoveCarFromFav
} from '../actions/favorite.actions';
import {FavoritesService} from '../../services/favorites.service';
import {GetCars, SetLoading} from '../actions/car.actions';
import {AppState} from '../state/app.state';


@Injectable()
export class FavoriteEffects {
  @Effect()
  getFavCarList = this.actions$.pipe(
    ofType<GetFavCarList>(EFavoriteActions.GetFavCarList),
    switchMap(() => {
      let favCarsFromLS: number[];
      if (!!localStorage.getItem('favorite_cars_ids')) {
        favCarsFromLS = JSON.parse(localStorage.getItem('favorite_cars_ids'));
      } else {
        favCarsFromLS = null;
      }
      return this.favService.getFavoriteCars(favCarsFromLS).pipe(map(data => data));
    }),
    switchMap((carIDs: number[]) => {
      return of(new GetFavCarListSuccess(carIDs));
    })
  );

  @Effect({dispatch: false})
  updateCarsList$ = this.actions$.pipe(
    ofType<GetFavCarListSuccess>(EFavoriteActions.GetFavCarListSuccess),
    tap(() => {
      this.store.dispatch(new GetCars());
    })
  );

  @Effect({dispatch: false})
  addCarToFav = this.actions$.pipe(
    ofType<AddCarToFav>(EFavoriteActions.AddCarToFav),
    switchMap(action => {
      this.store.dispatch(new SetLoading(true));
      return this.favService.addFavorite(action.payload)
        .pipe(map(data => data));
    }),
    tap((data) => {
      localStorage.setItem('favorite_cars_ids', JSON.stringify(data));
      this.store.dispatch(new GetFavCarList());
    })
  );

  @Effect({dispatch: false})
  removeCarFromFav = this.actions$.pipe(
    ofType<RemoveCarFromFav>(EFavoriteActions.RemoveCarFromFav),
    throttleTime(700),
    switchMap(action => {
      this.store.dispatch(new SetLoading(true));
      return this.favService.removeFavorite(action.payload)
        .pipe(map(data => data));
    }),
    tap((data) => {
      localStorage.setItem('favorite_cars_ids', JSON.stringify(data));
      this.store.dispatch(new GetFavCarList());
    })
  );


  constructor(
    private actions$: Actions,
    private favService: FavoritesService,
    private store: Store<AppState>
  ) {
  }

}
