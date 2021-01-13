import {Action} from '@ngrx/store';
import {PageModel} from '../../models/page.model';

export enum ERangeActions {
  SetPageInfo = 'Set Page Info',
  SetPageInfoSuccess = 'Set Page Info Success',
  SetTotalCount = 'Set Total Count',
  SetTotalCountSuccess = 'Set Total Count Success',
}

export class SetPageInfo implements Action{
  public readonly type = ERangeActions.SetPageInfo;
  constructor(public payload: PageModel) {}
}
export class SetPageInfoSuccess implements Action{
  public readonly type = ERangeActions.SetPageInfoSuccess;
  constructor(public payload: PageModel) {}
}
export class SetTotalCount implements Action{
  public readonly type = ERangeActions.SetTotalCount;
  constructor(public payload: number) {}
}
export class SetTotalCountSuccess implements Action{
  public readonly type = ERangeActions.SetTotalCountSuccess;
  constructor(public payload: number) {}
}



export type RangeActions =
  SetTotalCount |
  SetTotalCountSuccess |
  SetPageInfo |
  SetPageInfoSuccess;
