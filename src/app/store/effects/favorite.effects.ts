import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddCarToFav,
  EFavoriteActions, GetFavCarList, GetFavCarListSuccess,
  RemoveCarFromFav
} from '../actions/favorite.actions';
import {delay, map, switchMap, tap, throttleTime} from 'rxjs/operators';
import {of} from 'rxjs';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';
import {GetCars} from '../actions/car.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';


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
      return this.favService.addFavorite(action.payload)
        .pipe(map(data => data));
    }),
    tap(() => {
      this.store.dispatch(new GetFavCarList());
    })
  );

  @Effect({dispatch: false})
  removeCarFromFav = this.actions$.pipe(
    ofType<RemoveCarFromFav>(EFavoriteActions.RemoveCarFromFav),
    throttleTime(700),
    switchMap(action => {
      return this.favService.removeFavorite(action.payload)
        .pipe(map(data => data));
    }),
    tap(() => {
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
