import {RouterReducerState } from '@ngrx/router-store';
import {CarState, initialCarState} from '../reducers/car.reducers';
import {FavoriteState, initialFavCarState} from '../reducers/favorite.reducers';
import {initialLoginState, LoginState} from '../reducers/login.reducers';
import {initialSelectedCarState, SelectedCarState} from '../reducers/selected-car.reducers';

export interface AppState {
  router?: RouterReducerState;
  cars: CarState;
  favs: FavoriteState;
  login: LoginState;
  selectedCar: SelectedCarState;
}

export const initialAppState: AppState = {
  cars: initialCarState,
  favs: initialFavCarState,
  login: initialLoginState,
  selectedCar: initialSelectedCarState
};

export function getInitialState(): AppState {
  return initialAppState;
}
