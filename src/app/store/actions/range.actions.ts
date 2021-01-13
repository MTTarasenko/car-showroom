import {Action} from '@ngrx/store';
import {PageModel} from '../../models/page.model';

export enum ERangeActions {
  SetPageInfo = 'Set Page Info',
  SetPageInfoSuccess = 'Set Page Info Success',
  // SetPageCount = 'Set Page Count',
  // SetPageCountSuccess = 'Set Page Count Success',
}

export class SetPageInfo implements Action{
  public readonly type = ERangeActions.SetPageInfo;
  constructor(public payload: PageModel) {}
}
export class SetPageInfoSuccess implements Action{
  public readonly type = ERangeActions.SetPageInfoSuccess;
  constructor(public payload: PageModel) {}
}
// export class SetPageCount implements Action{
//   public readonly type = ERangeActions.SetPageCount;
//   constructor(public payload: number) {}
// }
// export class SetPageCountSuccess implements Action{
//   public readonly type = ERangeActions.SetPageCountSuccess;
//   constructor(public payload: number) {}
// }



export type RangeActions =
  // SetPageCount |
  // SetPageCountSuccess |
  SetPageInfo |
  SetPageInfoSuccess;
