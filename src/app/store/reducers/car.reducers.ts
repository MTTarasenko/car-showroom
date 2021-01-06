import {CarState, initialCarState} from '../state/car.state';
import {CarActions, ECarActions} from '../actions/car.actions';


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
    case ECarActions.AddCarToFavSuccess: {
      return {
        ...state,
        newCar: action.payload
      };
    }

    default:
      return state;
  }
};
