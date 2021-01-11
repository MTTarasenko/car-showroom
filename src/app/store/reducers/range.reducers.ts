import {ERangeActions, RangeActions} from '../actions/range.actions';
import {initialRangeState, RangeState} from '../state/range.state';


export const rangeReducers = (
  state = initialRangeState,
  action: RangeActions
): RangeState => {
  switch (action.type) {
    case ERangeActions.GetRangeFromSuccess: {
      return {
        ...state,
        rangeFrom: action.payload
      };
    }
    case ERangeActions.GetRangeToSuccess: {
      return {
        ...state,
        rangeTo: action.payload
      };
    }
    default:
      return state;
  }
};
