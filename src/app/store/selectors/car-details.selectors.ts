import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {CarDetailsState} from '../reducers/car-details.reducers';

const selectSelCar = (state: AppState) => state.selectedCar;

export const selectSelectedCar = createSelector(
  selectSelCar,
  (state: CarDetailsState) => state.selectedCar
);

export const selectSelectedCarLoading = createSelector(
  selectSelCar,
  (state: CarDetailsState) => state.isSelectedCarLoading
);


