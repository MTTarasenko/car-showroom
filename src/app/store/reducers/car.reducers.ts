import {CarActions, ECarActions} from '../actions/car.actions';
import {Car} from '../../models/car';


export const carReducers = (
  state = initialCarState,
  action: CarActions
): CarState => {
  switch (action.type) {
    case ECarActions.GetCarsSuccess: {
      return {
        ...state,
        cars: action.payload
      };
    }
    case ECarActions.GetCarSuccess: {
      return {
        ...state,
        selectedCar: action.payload
      };
    }
    case ECarActions.AddCarSuccess: {
      return {
        ...state,
        newCar: action.payload
      };
    }
    case ECarActions.GetCarsCountSuccess: {
      return {
        ...state,
        totalCount: action.payload
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
  newCar: Car;
}

export const initialCarState: CarState = {
  cars: null,
  totalCount: null,
  selectedCar: null,
  newCar: null,
};
