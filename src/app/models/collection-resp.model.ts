import {Car} from './car';

export class CollectionRespModel<T> {
  totalCount: number;
  list: T;
}
