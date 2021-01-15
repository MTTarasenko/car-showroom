import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppState} from '../state/app.state';
import {carListReducers} from './car-list.reducers';
import {favoriteReducers} from './favorite.reducers';
import {loginReducers} from './login.reducers';
import {carDetailsReducers} from './car-details.reducers';


export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  cars: carListReducers,
  favoriteCarsList: favoriteReducers,
  login: loginReducers,
  selectedCar: carDetailsReducers
};
