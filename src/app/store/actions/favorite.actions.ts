import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum EFavoriteActions {
  AddCarToFav = '[Car] Add Car To Fav',
  AddCarToFavSuccess = '[Car] Add Car To Fav Success',
  RemoveCarFromFav = '[Car] Remove Car From Fav',
  RemoveCarFromFavSuccess = '[Car] Remove Car From Fav Success',
}

export class AddCarToFav implements Action{
  public readonly type = EFavoriteActions.AddCarToFav;
  constructor(public payload: Car) {}
}
export class AddCarToFavSuccess implements Action{
  public readonly type = EFavoriteActions.AddCarToFavSuccess;
  constructor(public payload: Car) {}
}
export class RemoveCarFromFav implements Action{
  public readonly type = EFavoriteActions.RemoveCarFromFav;
  constructor(public payload: Car) {}
}
export class RemoveCarFromFavSuccess implements Action{
  public readonly type = EFavoriteActions.RemoveCarFromFavSuccess;
  constructor(public payload: Car) {}
}

export type FavoriteActions =
  AddCarToFav |
  AddCarToFavSuccess |
  RemoveCarFromFav |
  RemoveCarFromFavSuccess;
