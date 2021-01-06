import {Car} from '../../models/car';

export interface CarState {
  cars: Car[];
  selectedCar: Car;
  newCar: Car;
}

export const initialCarState: CarState = {
  cars: null,
  selectedCar: null,
  newCar: null
};
