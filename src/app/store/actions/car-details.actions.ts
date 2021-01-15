import {Action} from '@ngrx/store';
import {PageModel} from '../../models/page.model';
import {Car} from '../../models/car';

export enum ESelectedCarActions {
  GetCar = '[Car] Get Car',
  GetCarSuccess = '[Car] Get Car Success',
  ClearStore = 'Clear Store',
  GetCarError = '[Car] Get Car Error',
  SetLoading = 'Set Car Loading'
}

export class GetCar implements Action{
  public readonly type = ESelectedCarActions.GetCar;
  constructor(public payload: number) {}
}

export class GetCarSuccess implements Action{
  public readonly type = ESelectedCarActions.GetCarSuccess;
  constructor(public payload: Car) {}
}
export class ClearStore implements Action{
  public readonly type = ESelectedCarActions.ClearStore;
  constructor(public payload: PageModel) {}
}
export class GetCarError implements Action{
  public readonly type = ESelectedCarActions.GetCarError;
}

export class SetCarLoading implements Action{
  public readonly type = ESelectedCarActions.SetLoading;
  constructor(public payload: boolean) {}
}

export type CarDetailsActions = GetCar |
  GetCarSuccess |
  ClearStore |
  GetCarError |
  SetCarLoading;
