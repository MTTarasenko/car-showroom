import {Car} from '../../models/car';


export interface FavoriteState {
  favCarList: Car[];
  favCar: Car;
}

export const initialFavCarState = {
  favCarList: [],
  favCar: null
};
