import {EFavoriteActions, FavoriteActions} from '../actions/favorite.actions';
import {Car} from '../../models/car';

export interface FavoriteState {
  favCarList: number[];
}

export const initialFavCarState = {
  favCarList: [],
};

export const favoriteReducers = (
  state = initialFavCarState,
  action: FavoriteActions
): FavoriteState => {
  switch (action.type) {
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
