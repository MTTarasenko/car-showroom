import {Action} from '@ngrx/store';
import {LoginDataModel} from '../../models/login-data.model';


export enum ELoginActions {
  GetLogin = 'Get Login',
  LogOut = 'LogOut',
}

export class GetLogin implements Action{
  public readonly type = ELoginActions.GetLogin;
  constructor(public payload: LoginDataModel) {}
}
export class LogOut implements Action{
  public readonly type = ELoginActions.LogOut;
}

export type LoginActions =
  GetLogin |
  LogOut;
