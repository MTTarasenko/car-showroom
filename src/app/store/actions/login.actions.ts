import {Action} from '@ngrx/store';


export enum ELoginActions {
  GetLogin = 'Get Login',
  GetLoginSuccess = 'Get Login Success',
  LogOut = 'LogOut',
  LogOutSuccess = 'LogOut Success',
}

export class GetLogin implements Action{
  public readonly type = ELoginActions.GetLogin;
  constructor(public payload: string[]) {}
}
export class GetLoginSuccess implements Action{
  public readonly type = ELoginActions.GetLoginSuccess;
  constructor(public payload: string[]) {}
}
export class LogOut implements Action{
  public readonly type = ELoginActions.LogOut;
}
export class LogOutSuccess implements Action{
  public readonly type = ELoginActions.LogOutSuccess;
}

export type LoginActions =
  GetLogin |
  GetLoginSuccess |
  LogOut |
  LogOutSuccess;
