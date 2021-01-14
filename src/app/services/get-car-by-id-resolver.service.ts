import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CarService} from './car.service';
import {Observable} from 'rxjs';
import {filter, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {SelectedCarModel} from '../models/selected-car.model';
import {selectSelectedCar, selectSelectedCarLoading} from '../store/selectors/selected-car.selectors';
import {GetCar} from '../store/actions/selected-car.actions';

@Injectable()
export class GetCarByIdResolverService {

  constructor(private service: CarService,
              private readonly router: Router,
              private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SelectedCarModel> {
    this.store.dispatch(new GetCar(Number(route.paramMap.get('id'))));
    return this.store.pipe(
      // withLatestFrom(this.store.pipe(select(selectSelectedCarLoading))),
      select(selectSelectedCar),
    ).pipe(
      filter(data => data.isSelected),
      take(1)
    );
  }
}
