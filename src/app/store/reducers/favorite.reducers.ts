import {FavoriteState, initialFavCarState} from '../state/favorite.state';
import {EFavoriteActions, FavoriteActions} from '../actions/favorite.actions';


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

    default:
      return state;
  }
};
