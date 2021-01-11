import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCarsCount = '[Car] Get Cars Count',
  GetCarsCountSuccess = '[Car] Get Cars Count Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  AddCar = '[Car] Add Car',
  AddCarSuccess = '[Car] Add Car Success',
  AddCarToFav = '[Car] Add Car To Fav',
  AddCarToFavSuccess = '[Car] Add Car To Fav Success',
  RemoveCarFromFav = '[Car] Remove Car From Fav',
  RemoveCarFromFavSuccess = '[Car] Remove Car From Fav Success',
  GetRangeFrom = 'Range From',
  GetRangeFromSuccess = 'Range From Success',
  GetRangeTo = 'Range To',
  GetRangeToSuccess = 'Range To Success',
}

export class GetCarsCount implements Action{
  public readonly type = ECarActions.GetCarsCount;
}

export class GetCarsCountSuccess implements Action{
  public readonly type = ECarActions.GetCarsCountSuccess;
  constructor(public payload: number) {}
}
export class GetCars implements Action{
  public readonly type = ECarActions.GetCars;
  constructor() {}
}

export class GetCarsSuccess implements Action{
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: Car[]) {}
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
export class RemoveCarFromFav implements Action{
  public readonly type = ECarActions.RemoveCarFromFav;
  constructor(public payload: Car) {}
}
export class RemoveCarFromFavSuccess implements Action{
  public readonly type = ECarActions.RemoveCarFromFavSuccess;
  constructor(public payload: Car) {}
}
export class GetRangeFrom implements Action{
  public readonly type = ECarActions.GetRangeFrom;
  constructor(public payload: number) {}
}

export class GetRangeFromSuccess implements Action{
  public readonly type = ECarActions.GetRangeFromSuccess;
  constructor(public payload: number) {}
}
export class GetRangeTo implements Action{
  public readonly type = ECarActions.GetRangeTo;
  constructor(public payload: number) {}
}

export class GetRangeToSuccess implements Action{
  public readonly type = ECarActions.GetRangeToSuccess;
  constructor(public payload: number) {}
}


export type CarActions = GetCars |
  GetCarsSuccess |
  GetCar |
  GetCarSuccess |
  AddCar |
  AddCarSuccess |
  AddCarToFav |
  AddCarToFavSuccess |
  RemoveCarFromFav |
  RemoveCarFromFavSuccess |
  GetCarsCount |
  GetCarsCountSuccess |
  GetRangeFrom |
  GetRangeFromSuccess |
  GetRangeTo |
  GetRangeToSuccess;
