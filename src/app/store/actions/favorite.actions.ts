import {Action} from '@ngrx/store';
import {Car} from '../../models/car';


export enum EFavoriteActions {
  GetFavCarList = '[Car] Get Car List',
  GetFavCarListSuccess = '[Car] Get Car List Success',
  ClearFavStore = 'Clear Fav Store',
  AddCarToFav = '[Car] Add Car To Fav',
  RemoveCarFromFav = '[Car] Remove Car From Fav',
}

export class GetFavCarList implements Action{
  public readonly type = EFavoriteActions.GetFavCarList;
}
export class GetFavCarListSuccess implements Action{
  public readonly type = EFavoriteActions.GetFavCarListSuccess;
  constructor(public payload: number[]) {}
}
export class AddCarToFav implements Action{
  public readonly type = EFavoriteActions.AddCarToFav;
  constructor(public payload: number) {}
}
export class RemoveCarFromFav implements Action{
  public readonly type = EFavoriteActions.RemoveCarFromFav;
  constructor(public payload: number) {}
}
export class ClearFavStore implements Action{
  public readonly type = EFavoriteActions.ClearFavStore;
}

export type FavoriteActions =
  GetFavCarList |
  GetFavCarListSuccess |
  AddCarToFav |
  RemoveCarFromFav |
  ClearFavStore;
