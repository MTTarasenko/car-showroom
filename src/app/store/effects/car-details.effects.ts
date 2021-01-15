import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';
import {Car} from '../../models/car';
import {of} from 'rxjs';
import {CarService} from '../../services/car.service';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {Router} from '@angular/router';
import {
  ESelectedCarActions,
  GetCar,
  GetCarError,
  GetCarSuccess,
  SetCarLoading
} from '../actions/car-details.actions';


@Injectable()
export class CarDetailsEffects {
  @Effect()
  getCar$ = this.actions$.pipe(
    ofType<GetCar>(ESelectedCarActions.GetCar),
    map(action => action.payload),
    switchMap(id => {
      // start showing spinner
      this.store.dispatch(new SetCarLoading(true));
      return this.carService.getCarById(id).pipe(map(data => data));
    }),
    switchMap((car: Car) => {
      // this.store.dispatch(new SetCarLoading(false));
      if (car) {
        return of(new GetCarSuccess(car));
      } else {
        this.router.navigate(['/car-list/']);
        return of(new GetCarError());
      }
    })
  );

  constructor(
    private carService: CarService,
    private actions$: Actions,
    private store: Store<AppState>,
    private readonly router: Router
  ) {
  }

}
