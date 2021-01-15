import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CarService} from './car.service';
import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {selectSelectedCar} from '../store/selectors/car-details.selectors';
import {GetCar, SetCarLoading} from '../store/actions/car-details.actions';
import {Car} from '../models/car';

@Injectable()
export class GetCarByIdResolverService {

  constructor(private service: CarService,
              private readonly router: Router,
              private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Car> {
    this.store.dispatch(new GetCar(Number(route.paramMap.get('id'))));
    return this.store.pipe(
      select(selectSelectedCar),
    ).pipe(
      filter(data => {
        if (data) {
          // stop showing spinner
          this.store.dispatch(new SetCarLoading(false));
          return !!data;
        }
      }),
      take(1)
    );
  }
}
