import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CarService} from '../../services/car.service';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';
import {filter, map, skipUntil, take} from 'rxjs/operators';
import {SelectedCarModel} from '../../models/selected-car.model';
import {ClearStore, GetCar} from '../../store/actions/car.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class CarDetailsComponent implements OnInit, OnDestroy {

  car$: Observable<Car>;

  constructor(private service: CarService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.car$ = this.route.data.pipe(
      map(data => {
        console.log('getting car');
        return data.carById.selectedCar;
      }),
      take(1)
    );
  }

  ngOnDestroy(): void {
    // clear store
    this.store.dispatch(new ClearStore(null));
  }
}
