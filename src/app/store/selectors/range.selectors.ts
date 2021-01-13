import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {PaginationState} from '../reducers/range.reducers';

const selectRange = (state: AppState) => state.range;

export const selectPageCount = createSelector(
  selectRange,
  (state: PaginationState) => state.totalCount
);

export const selectPageInfo = createSelector(
  selectRange,
  (state: PaginationState) => state.pageState
);
