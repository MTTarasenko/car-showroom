import {RouterReducerState } from '@ngrx/router-store';
import {CarState, initialCarState} from './car.state';
import {initialRangeState, RangeState} from './range.state';
import {FavoriteState, initialFavCarState} from './favorite.state';

export interface AppState {
  router?: RouterReducerState;
  cars: CarState;
  range: RangeState;
  favs: FavoriteState;
}

export const initialAppState: AppState = {
  cars: initialCarState,
  range: initialRangeState,
  favs: initialFavCarState
};

export function getInitialState(): AppState {
  return initialAppState;
}
