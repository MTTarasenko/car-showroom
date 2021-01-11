import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {GetCar, GetCars} from '../../store/actions/car.actions';
import {selectSelectedCar} from '../../store/selectors/car.selector';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class CarDetailsComponent implements OnInit {

  car$ = this.store.pipe(select(selectSelectedCar));

  constructor(private service: CarService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCars());
    this.store.dispatch(new GetCar(Number(this.route.snapshot.params.id)));
    // this.car$ = this.route.data.pipe(
    //   map((data: { carById: Car }) => {
    //     console.log(data);
    //     return data.carById;
    //   })
    // );
  }
}
