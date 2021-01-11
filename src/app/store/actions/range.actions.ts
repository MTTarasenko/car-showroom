import {Action} from '@ngrx/store';

export enum ERangeActions {
  GetRangeFrom = 'Range From',
  GetRangeFromSuccess = 'Range From Success',
  GetRangeTo = 'Range To',
  GetRangeToSuccess = 'Range To Success',
}

export class GetRangeFrom implements Action{
  public readonly type = ERangeActions.GetRangeFrom;
  constructor(public payload: number) {}
}

export class GetRangeFromSuccess implements Action{
  public readonly type = ERangeActions.GetRangeFromSuccess;
  constructor(public payload: number) {}
}
export class GetRangeTo implements Action{
  public readonly type = ERangeActions.GetRangeTo;
  constructor(public payload: number) {}
}

export class GetRangeToSuccess implements Action{
  public readonly type = ERangeActions.GetRangeToSuccess;
  constructor(public payload: number) {}
}

export type RangeActions =
  GetRangeFrom |
  GetRangeFromSuccess |
  GetRangeTo |
  GetRangeToSuccess;
