import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CarService} from './car.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Car} from '../models/car';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {GetCar} from '../store/actions/car.actions';
import {selectSelectedCar} from '../store/selectors/car.selector';

@Injectable()
export class GetCarByIdResolverService {

  constructor(private service: CarService,
              private readonly router: Router,
              private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Car> {
    this.store.dispatch(new GetCar(Number(route.paramMap.get('id'))));
    console.log(Number(route.paramMap.get('id')));
    return this.store.pipe(select(selectSelectedCar)).pipe(
      map(data => {
        if (data) {
          console.log(data);
          return data;
        } else {
          console.log('no data');
          this.router.navigate(['/car-list/']);
        }
      })
    );
  }
}
