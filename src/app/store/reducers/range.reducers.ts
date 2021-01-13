import {ERangeActions, RangeActions} from '../actions/range.actions';
import {PageModel} from '../../models/page.model';


export const rangeReducers = (
  state = initialRangeState,
  action: RangeActions
): PaginationState => {
  switch (action.type) {
    case ERangeActions.SetTotalCount: {
      return {
        ...state,
        totalCount: action.payload,
      };
    }
    case ERangeActions.SetPageInfo: {
      return {
        ...state,
        pageState: action.payload
      };
    }
    default:
      return state;
  }
};

export interface PaginationState {
  pageState: PageModel;
  totalCount: number;
}

export const initialRangeState: PaginationState = {
  pageState: {
    pageIndex: 0,
    pageSize: 4
  },
  totalCount: null
};
