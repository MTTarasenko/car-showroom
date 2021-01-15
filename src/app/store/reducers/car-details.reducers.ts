import {ESelectedCarActions, CarDetailsActions} from '../actions/car-details.actions';
import {Car} from '../../models/car';


export interface CarDetailsState {
  selectedCar: Car;
  isSelectedCarLoading: boolean;

}

export const initialCarDetailsState: CarDetailsState = {
  selectedCar: null,
  isSelectedCarLoading: false
};

export const carDetailsReducers = (
  state = initialCarDetailsState,
  action: CarDetailsActions
): CarDetailsState => {
  switch (action.type) {
    case ESelectedCarActions.GetCarSuccess: {
      return {
        ...state,
        selectedCar: action.payload
      };
    }
    case ESelectedCarActions.SetLoading: {
      return {
        ...state,
        isSelectedCarLoading: action.payload
      };
    }
    case ESelectedCarActions.ClearStore: {
      return initialCarDetailsState;
    }
    default: {
      return state;
    }
  }
};
