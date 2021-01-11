import {Action} from '@ngrx/store';


export enum ELoginActions {
  GetLogin = 'Get Login',
  GetLoginSuccess = 'Get Login Success',
}

export class GetLogin implements Action{
  public readonly type = ELoginActions.GetLogin;
  constructor(public payload: string[]) {}
}
export class GetLoginSuccess implements Action{
  public readonly type = ELoginActions.GetLoginSuccess;
  constructor(public payload: string[]) {}
}

export type LoginActions =
  GetLogin |
  GetLoginSuccess;
