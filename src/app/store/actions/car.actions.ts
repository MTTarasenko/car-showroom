import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCarsCount = '[Car] Get Cars Count',
  GetCarsCountSuccess = '[Car] Get Cars Count Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  GetCarError = '[Car] Get Car Error',
  AddCar = '[Car] Add Car',
  AddCarSuccess = '[Car] Add Car Success',
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
export class GetCarError implements Action{
  public readonly type = ECarActions.GetCarError;
}

export class AddCar implements Action{
  public readonly type = ECarActions.AddCar;
  constructor(public payload: Car) {}
}
export class AddCarSuccess implements Action{
  public readonly type = ECarActions.AddCarSuccess;
  constructor(public payload: Car) {}
}


export type CarActions = GetCars |
  GetCarsSuccess |
  GetCar |
  GetCarSuccess |
  AddCar |
  AddCarSuccess |
  GetCarError |
  GetCarsCount |
  GetCarsCountSuccess;
