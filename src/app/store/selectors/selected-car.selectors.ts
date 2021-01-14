import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {SelectedCarState} from '../reducers/selected-car.reducers';

const selectSelCar = (state: AppState) => state.selectedCar;

export const selectSelectedCar = createSelector(
  selectSelCar,
  (state: SelectedCarState) => state.selectedCar
);
