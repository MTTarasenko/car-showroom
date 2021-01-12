import {ERangeActions, RangeActions} from '../actions/range.actions';


export const rangeReducers = (
  state = initialRangeState,
  action: RangeActions
): PaginationState => {
  switch (action.type) {
    case ERangeActions.SetPageStateSuccess: {
      return {
        ...state,
        pageIndex: action.payload,
      };
    }
    case ERangeActions.SetPageCountSuccess: {
      return {
        ...state,
        totalCount: action.payload,
        pageSize: action.payload
      };
    }
    default:
      return state;
  }
};

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export const initialRangeState: PaginationState = {
  pageIndex: 0,
  pageSize: 4,
  totalCount: null
};
