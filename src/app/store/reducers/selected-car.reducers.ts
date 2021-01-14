import {ESelectedCarActions, SelectedCarActions} from '../actions/selected-car.actions';
import {SelectedCarModel} from '../../models/selected-car.model';


export interface SelectedCarState {
  selectedCar: SelectedCarModel;
  isSelectedCarLoading: boolean;
}

export const initialSelectedCarState: SelectedCarState = {
  selectedCar: {
    selectedCar: null,
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
    default: {
      return state;
    }
  }
};
