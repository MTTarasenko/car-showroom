import {Action} from '@ngrx/store';
import {Car} from '../../models/car';
import {CollectionRespModel} from '../../models/collection-resp.model';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  GetCarError = '[Car] Get Car Error',
  AddCar = '[Car] Add Car',
  AddCarSuccess = '[Car] Add Car Success',
  GetCarYears = 'Get Car Years',
  GetCarYearsSuccess = 'Get Car Years Success',
}

export class GetCars implements Action{
  public readonly type = ECarActions.GetCars;
  constructor() {}
}

export class GetCarsSuccess implements Action{
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: CollectionRespModel) {}
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

export class GetCarYears implements Action{
  public readonly type = ECarActions.GetCarYears;
}
export class GetCarYearsSuccess implements Action{
  public readonly type = ECarActions.GetCarYearsSuccess;
  constructor(public payload: number[]) {}
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
  GetCarYears |
  GetCarYearsSuccess;
