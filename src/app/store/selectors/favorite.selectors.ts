import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {FavoriteState} from '../reducers/favorite.reducers';

const selectFavCars = (state: AppState) => state.favs;

export const selectFavCarsList = createSelector(
  selectFavCars,
  (state: FavoriteState) => state.favCarList
);
