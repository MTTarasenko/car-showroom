import {Action} from '@ngrx/store';
import {Car} from '../../models/car';
import {CollectionRespModel} from '../../models/collection-resp.model';
import {PageModel} from '../../models/page.model';


export enum ECarActions {
  GetCars = '[Car] Get Cars',
  GetCarsSuccess = '[Car] Get Cars Success',
  AddCar = '[Car] Add Car',
  SetPageInfo = 'Set Page Info',
  SetLoading = 'Set Loading'
}

export class GetCars implements Action{
  public readonly type = ECarActions.GetCars;
  constructor() {}
}

export class GetCarsSuccess implements Action{
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: CollectionRespModel) {}
}
export class AddCar implements Action{
  public readonly type = ECarActions.AddCar;
  constructor(public payload: Car) {}
}
export class SetPageInfo implements Action{
  public readonly type = ECarActions.SetPageInfo;
  constructor(public payload: PageModel) {}
}
export class SetLoading implements Action{
  public readonly type = ECarActions.SetLoading;
  constructor(public payload: boolean) {}
}


export type CarActions = GetCars |
  GetCarsSuccess |
  AddCar |
  SetPageInfo |
  SetLoading;
