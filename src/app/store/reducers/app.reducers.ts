import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppState} from '../state/app.state';
import {carReducers} from './car.reducers';
import {favoriteReducers} from './favorite.reducers';
import {loginReducers} from './login.reducers';
import {selectedCarReducers} from './selected-car.reducers';


export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  cars: carReducers,
  favs: favoriteReducers,
  login: loginReducers,
  selectedCar: selectedCarReducers
};
