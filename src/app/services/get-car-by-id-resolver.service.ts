import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CarService} from './car.service';
import {Observable, of} from 'rxjs';
import {filter, map, skipUntil, take} from 'rxjs/operators';
import {Car} from '../models/car';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {GetCar} from '../store/actions/car.actions';
import {selectSelectedCar} from '../store/selectors/car.selector';
import {SelectedCarModel} from '../models/selected-car.model';

@Injectable()
export class GetCarByIdResolverService {

  constructor(private service: CarService,
              private readonly router: Router,
              private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Car | SelectedCarModel> {
    this.store.dispatch(new GetCar(Number(route.paramMap.get('id'))));
    return this.store.pipe(
      select(selectSelectedCar),
    ).pipe(
      filter(details => !!details.isSelected),
      take(1)
    );
    // return this.store.pipe(select(selectSelectedCar)).pipe(
    //   map(data => {
    //     console.log(data);
    //     if (data.isSelected) {
    //       console.log('success');
    //       return data;
    //     } else {
    //       console.log('no data');
    //       // this.router.navigate(['/car-list/']);
    //     }
    //   }),
    //   take(1)
    // );
  }
}
