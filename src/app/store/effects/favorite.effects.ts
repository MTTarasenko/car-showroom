import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddCarToFav, AddCarToFavSuccess,
  EFavoriteActions,
  RemoveCarFromFav, RemoveCarFromFavSuccess
} from '../actions/favorite.actions';
import {map, switchMap, throttleTime, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';


@Injectable()
export class FavoriteEffects {
  @Effect()
  addCarToFav = this.actions$.pipe(
    ofType<AddCarToFav>(EFavoriteActions.AddCarToFav),
    switchMap(action => {
      return  this.favService.addFavorite(action.payload).pipe(map(data => data));
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
