import {Action} from '@ngrx/store';

export enum ERangeActions {
  SetPageState = 'Set Page State',
  SetPageStateSuccess = 'Set Page State Success',
  SetPageCount = 'Set Page Count',
  SetPageCountSuccess = 'Set Page Count Success',
}

export class SetPageState implements Action{
  public readonly type = ERangeActions.SetPageState;
  constructor(public payload: number) {}
}
export class SetPageStateSuccess implements Action{
  public readonly type = ERangeActions.SetPageStateSuccess;
  constructor(public payload: number) {}
}
export class SetPageCount implements Action{
  public readonly type = ERangeActions.SetPageCount;
  constructor(public payload: number) {}
}
export class SetPageCountSuccess implements Action{
  public readonly type = ERangeActions.SetPageCountSuccess;
  constructor(public payload: number) {}
}



export type RangeActions =
  SetPageState |
  SetPageStateSuccess |
  SetPageCount |
  SetPageCountSuccess;
