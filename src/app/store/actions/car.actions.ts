import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  AddCar = '[Car] Add Car',
  AddCarSuccess = '[Car] Add Car Success',
  AddCarToFav = '[Car] Add Car To Fav',
  AddCarToFavSuccess = '[Car] Add Car To Fav Success',
}

export class GetCars implements Action{
  public readonly type = ECarActions.GetCars;
  constructor(public payload: number[]) {}
}

export class GetCarsSuccess implements Action{
  public readonly type = ECarActions.GetCarsSuccess;

  constructor(public payload: { totalCount: number; cars: Car[] }) {}
}

export class GetCar implements Action{
  public readonly type = ECarActions.GetCar;
  constructor(public payload: number) {}
}

export class GetCarSuccess implements Action{
  public readonly type = ECarActions.GetCarSuccess;
  constructor(public payload: Car) {}
}

export class AddCar implements Action{
  public readonly type = ECarActions.AddCar;
  constructor(public payload: Car) {}
}
export class AddCarSuccess implements Action{
  public readonly type = ECarActions.AddCarSuccess;
  constructor(public payload: Car) {}
}
export class AddCarToFav implements Action{
  public readonly type = ECarActions.AddCarToFav;
  constructor(public payload: Car) {}
}
export class AddCarToFavSuccess implements Action{
  public readonly type = ECarActions.AddCarToFavSuccess;
  constructor(public payload: Car) {}
}

export type CarActions = GetCars |
  GetCarsSuccess |
  GetCar |
  GetCarSuccess |
  AddCar |
  AddCarSuccess |
  AddCarToFav |
  AddCarToFavSuccess;