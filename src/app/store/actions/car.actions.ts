import {Action} from '@ngrx/store';
import {Car} from '../../models/car';
import {CollectionRespModel} from '../../models/collection-resp.model';
import {PageModel} from '../../models/page.model';
import {SelectedCarModel} from '../../models/selected-car.model';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  GetCarError = '[Car] Get Car Error',
  AddCar = '[Car] Add Car',
  SetPageInfo = 'Set Page Info',
  ClearStore = 'Clear Store'
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
  constructor(public payload: SelectedCarModel) {}
}
export class GetCarError implements Action{
  public readonly type = ECarActions.GetCarError;
}
export class AddCar implements Action{
  public readonly type = ECarActions.AddCar;
  constructor(public payload: Car) {}
}
export class SetPageInfo implements Action{
  public readonly type = ECarActions.SetPageInfo;
  constructor(public payload: PageModel) {}
}
export class ClearStore implements Action{
  public readonly type = ECarActions.ClearStore;
  constructor(public payload: PageModel) {}
}


export type CarActions = GetCars |
  GetCarsSuccess |
  GetCar |
  GetCarSuccess |
  AddCar |
  GetCarError |
  SetPageInfo |
  ClearStore;
