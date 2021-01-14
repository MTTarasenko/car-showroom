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
  ClearStore,
  ESelectedCarActions,
  GetCar,
  GetCarError,
  GetCarSuccess,
  SetCarLoading
} from '../actions/selected-car.actions';


@Injectable()
export class SelectedCarEffects {
  @Effect()
  getCar$ = this.actions$.pipe(
    ofType<GetCar>(ESelectedCarActions.GetCar),
    map(action => action.payload),
    switchMap(id => {
      console.log('getting car');
      this.store.dispatch(new SetCarLoading(true));
      return this.carService.getCarById(id).pipe(map(data => data));
    }),
    switchMap((car: Car) => {
      this.store.dispatch(new SetCarLoading(false));
      if (car) {
        return of(new GetCarSuccess({selectedCar: car, isSelected: true}));
      } else {
        this.router.navigate(['/car-list/']);
        return of(new GetCarError());
      }
    })
  );

  @Effect({dispatch: false})
  clearStore$ = this.actions$.pipe(
    ofType<ClearStore>(ESelectedCarActions.ClearStore),
    tap(() => {
      console.log('clearing store');
      this.store.dispatch(new GetCarSuccess({selectedCar: null, isSelected: false}));
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
