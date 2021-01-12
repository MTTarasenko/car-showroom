import {EFavoriteActions, FavoriteActions} from '../actions/favorite.actions';
import {Car} from '../../models/car';


export const favoriteReducers = (
  state = initialFavCarState,
  action: FavoriteActions
): FavoriteState => {
  switch (action.type) {
    case EFavoriteActions.AddCarToFavSuccess: {
      return {
        ...state,
        favCar: action.payload
      };
    }
    case EFavoriteActions.GetFavCarListSuccess: {
      return {
        ...state,
        favCarList: action.payload
      };
    }
    default:
      return state;
  }
};

export interface FavoriteState {
  favCarList: Car[];
  favCar: Car;
}

export const initialFavCarState = {
  favCarList: [],
  favCar: null
};
