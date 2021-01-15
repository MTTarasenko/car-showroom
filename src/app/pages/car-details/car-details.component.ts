import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CarService} from '../../services/car.service';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {ClearStore} from '../../store/actions/car-details.actions';
import {selectSelectedCarLoading} from '../../store/selectors/car-details.selectors';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class CarDetailsComponent implements OnInit, OnDestroy {

  car$: Observable<Car>;
  isCarLoading$: Observable<boolean>;

  constructor(private service: CarService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.car$ = this.route.data.pipe(
      map(data => data.carById),
    );
    this.isCarLoading$ = this.store.pipe(select(selectSelectedCarLoading));
  }

  ngOnDestroy(): void {
    // clear store
    this.store.dispatch(new ClearStore(null));
  }
}
