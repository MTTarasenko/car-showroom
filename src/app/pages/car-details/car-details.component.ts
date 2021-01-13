import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CarService} from '../../services/car.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {GetCar} from '../../store/actions/car.actions';
import {selectSelectedCar} from '../../store/selectors/car.selector';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class CarDetailsComponent implements OnInit {

  car$: Observable<Car>;

  constructor(private service: CarService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCar(Number(this.route.snapshot.params.id)));
    this.car$ = this.store.pipe(select(selectSelectedCar));
    // this.car$ = this.route.data.pipe(
    //   map((data: { carById: Car }) => {
    //     console.log(data);
    //     return data.carById;
    //   })
    // );
  }
}
