import {Car} from '../../models/car';


export interface FavoriteState {
  favCar: Car;
}

export const initialFavCarState = {
  favCar: null
};
