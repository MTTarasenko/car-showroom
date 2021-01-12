import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {PaginationState} from '../reducers/range.reducers';

const selectRange = (state: AppState) => state.range;

export const selectPageState = createSelector(
  selectRange,
  (state: PaginationState) => {
    return [state.pageIndex, state.pageSize];
  }
);

export const selectPageCount = createSelector(
  selectRange,
  (state: PaginationState) => state.totalCount
);
