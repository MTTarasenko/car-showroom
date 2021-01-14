import {CarActions, ECarActions} from '../actions/car.actions';
import {Car} from '../../models/car';
import {PageModel} from '../../models/page.model';

export interface CarState {
  cars: Car[];
  totalCount: number;
  pageState: PageModel;
  isLoading: boolean;

}

export const initialCarState: CarState = {
  cars: null,
  totalCount: null,
  pageState: {
    pageIndex: 0,
    pageSize: 4
  },
  isLoading: false
};


export const carReducers = (
  state = initialCarState,
  action: CarActions
): CarState => {
  switch (action.type) {
    case ECarActions.GetCarsSuccess: {
      return {
        ...state,
        cars: action.payload.cars,
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
    default:
      return state;
  }
};

