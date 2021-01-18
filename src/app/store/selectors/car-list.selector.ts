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
  (state: CarListState) => {
    const paginationFromLS = localStorage.getItem('pagination state');
    // if (!!paginationFromLS) {
    //   return {
    //     pageSize: JSON.parse(paginationFromLS)[0],
    //     pageIndex: JSON.parse(paginationFromLS)[1]
    //   };
    // } else {
    //   return state.pageState;
    // }
    return state.pageState;
  }
);

export const selectLoading = createSelector(
  selectCars,
  (state: CarListState) => state.isLoading
);
