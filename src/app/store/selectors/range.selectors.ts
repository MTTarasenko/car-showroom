import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {RangeState} from '../reducers/range.reducers';

const selectRange = (state: AppState) => state.range;

export const selectRangeFrom = createSelector(
  selectRange,
  (state: RangeState) => state.rangeFrom
);

export const selectRangeTo = createSelector(
  selectRange,
  (state: RangeState) => state.rangeTo
);
