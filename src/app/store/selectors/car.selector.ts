import {createSelector} from '@ngrx/store';
import {CarState} from '../reducers/car.reducers';
import {AppState} from '../state/app.state';

const selectCars = (state: AppState) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (state: CarState) => state.cars
);

export const selectCarsAmount = createSelector(
  selectCars,
  (state: CarState) => state.totalCount
);

export const selectSelectedCar = createSelector(
  selectCars,
  (state: CarState) => state.selectedCar
);

export const selectCarYears = createSelector(
  selectCars,
  (state: CarState) => state.carYears
);

export const selectPageState = createSelector(
  selectCars,
  (state: CarState) => state.pageState
);
