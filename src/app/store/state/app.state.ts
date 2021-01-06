import {RouterReducerState } from '@ngrx/router-store';
import {CarState, initialCarState} from './car.state';

export interface AppState {
  router?: RouterReducerState;
  cars: CarState;
}

export const initialAppState: AppState = {
  cars: initialCarState
};

export function getInitialState(): AppState {
  return initialAppState;
}
