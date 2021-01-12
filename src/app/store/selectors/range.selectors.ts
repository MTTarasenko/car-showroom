import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {RangeState} from '../state/range.state';

const selectRange = (state: AppState) => state.range;

export const selectRangeFrom = createSelector(
  selectRange,
  (state: RangeState) => state.rangeFrom
);

export const selectRangeTo = createSelector(
  selectRange,
  (state: RangeState) => state.rangeTo
);
