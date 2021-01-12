import {RouterReducerState } from '@ngrx/router-store';
import {CarState, initialCarState} from '../reducers/car.reducers';
import {initialRangeState, PaginationState} from '../reducers/range.reducers';
import {FavoriteState, initialFavCarState} from '../reducers/favorite.reducers';
import {initialLoginState, LoginState} from '../reducers/login.reducers';

export interface AppState {
  router?: RouterReducerState;
  cars: CarState;
  range: PaginationState;
  favs: FavoriteState;
  login: LoginState;
}

export const initialAppState: AppState = {
  cars: initialCarState,
  range: initialRangeState,
  favs: initialFavCarState,
  login: initialLoginState
};

export function getInitialState(): AppState {
  return initialAppState;
}
