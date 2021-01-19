import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppState, initialAppState} from '../state/app.state';
import {carListReducers} from './car-list.reducers';
import {favoriteReducers} from './favorite.reducers';
import {loginReducers} from './login.reducers';
import {carDetailsReducers} from './car-details.reducers';
import {ELoginActions, LoginActions} from '../actions/login.actions';


export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  cars: carListReducers,
  favoriteCarsList: favoriteReducers,
  login: loginReducers,
  selectedCar: carDetailsReducers
};


export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (
    state: AppState,
    action: LoginActions
  ): AppState => {
    if (action.type === ELoginActions.LogOut) {
      state = initialAppState;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [clearState];
