import {ERangeActions, RangeActions} from '../actions/range.actions';


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

export interface RangeState {
  rangeFrom: number;
  rangeTo: number;
}

export const initialRangeState: RangeState = {
  rangeFrom: 0,
  rangeTo: 4
};
