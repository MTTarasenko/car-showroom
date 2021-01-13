import {CarActions, ECarActions} from '../actions/car.actions';
import {Car} from '../../models/car';
import {PageModel} from '../../models/page.model';


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
    case ECarActions.GetCarSuccess: {
      return {
        ...state,
        selectedCar: action.payload
      };
    }
    case ECarActions.SetPageInfo: {
      return {
        ...state,
        pageState: action.payload
      };
    }
    default:
      return state;
  }
};

export interface CarState {
  cars: Car[];
  totalCount: number;
  selectedCar: Car;
  carYears: number[];
  pageState: PageModel;
}

export const initialCarState: CarState = {
  cars: null,
  totalCount: null,
  selectedCar: null,
  carYears: null,
  pageState: {
    pageIndex: 0,
    pageSize: 4
  }
};
