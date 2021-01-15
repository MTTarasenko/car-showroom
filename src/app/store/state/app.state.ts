import {RouterReducerState } from '@ngrx/router-store';
import {CarListState, initialCarListState} from '../reducers/car-list.reducers';
import {FavoriteState, initialFavCarState} from '../reducers/favorite.reducers';
import {initialLoginState, LoginState} from '../reducers/login.reducers';
import {initialCarDetailsState, CarDetailsState} from '../reducers/car-details.reducers';

export interface AppState {
  router?: RouterReducerState;
  cars: CarListState;
  favoriteCarsList: FavoriteState;
  login: LoginState;
  selectedCar: CarDetailsState;
}

export const initialAppState: AppState = {
  cars: initialCarListState,
  favoriteCarsList: initialFavCarState,
  login: initialLoginState,
  selectedCar: initialCarDetailsState
};

export function getInitialState(): AppState {
  return initialAppState;
}
