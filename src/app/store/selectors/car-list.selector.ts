import {createSelector} from '@ngrx/store';
import {CarListState} from '../reducers/car-list.reducers';
import {AppState} from '../state/app.state';

const selectCars = (state: AppState) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (state: CarListState) => state.cars
);

export const selectCarsAmount = createSelector(
  selectCars,
  (state: CarListState) => state.totalCount
);

export const selectPageState = createSelector(
  selectCars,
  (state: CarListState) => state.pageState
);

export const selectLoading = createSelector(
  selectCars,
  (state: CarListState) => state.isLoading
);
