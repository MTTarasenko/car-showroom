import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {FavoriteState} from '../state/favorite.state';

const selectFavCars = (state: AppState) => state.favs;

export const selectFavCarsList = createSelector(
  selectFavCars,
  (state: FavoriteState) => state.favCarList
);
