import {RouterReducerState } from '@ngrx/router-store';
import {CarState, initialCarState} from '../reducers/car.reducers';
import {FavoriteState, initialFavCarState} from '../reducers/favorite.reducers';
import {initialLoginState, LoginState} from '../reducers/login.reducers';

export interface AppState {
  router?: RouterReducerState;
  cars: CarState;
  favs: FavoriteState;
  login: LoginState;
}

export const initialAppState: AppState = {
  cars: initialCarState,
  favs: initialFavCarState,
  login: initialLoginState
};

export function getInitialState(): AppState {
  return initialAppState;
}
