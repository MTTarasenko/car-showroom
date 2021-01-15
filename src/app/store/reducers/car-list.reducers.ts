import {CarActions, ECarActions} from '../actions/car.actions';
import {Car} from '../../models/car';
import {PageModel} from '../../models/page.model';

export interface CarListState {
  cars: Car[];
  totalCount: number;
  pageState: PageModel;
  isLoading: boolean;

}

export const initialCarListState: CarListState = {
  cars: null,
  totalCount: null,
  pageState: {
    pageIndex: 0,
    pageSize: 4
  },
  isLoading: false
};


export const carListReducers = (
  state = initialCarListState,
  action: CarActions
): CarListState => {
  switch (action.type) {
    case ECarActions.GetCarsSuccess: {
      return {
        ...state,
        cars: action.payload.list,
        totalCount: action.payload.totalCount
      };
    }
    case ECarActions.SetPageInfo: {
      return {
        ...state,
        pageState: action.payload
      };
    }
    case ECarActions.SetLoading: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    case ECarActions.ClearCarsStore: {
      return initialCarListState;
    }
    default:
      return state;
  }
};

