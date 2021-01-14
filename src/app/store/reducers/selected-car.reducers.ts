import {ESelectedCarActions, SelectedCarActions} from '../actions/selected-car.actions';
import {SelectedCarModel} from '../../models/selected-car.model';
import {Car} from '../../models/car';


export interface SelectedCarState {
  selectedCar: SelectedCarModel;
  isSelectedCarLoading: boolean;
}

export const initialSelectedCarState: SelectedCarState = {
  selectedCar: {
    selectedCar: {
      name: '',
      photoURL: '',
      year: '',
      description: '',
      id: null
    },
    isSelected: false
  },
  isSelectedCarLoading: false
};

export const selectedCarReducers = (
  state = initialSelectedCarState,
  action: SelectedCarActions
): SelectedCarState => {
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
    default: {
      return state;
    }
  }
};
