import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CarService} from '../../services/car.service';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class CarDetailsComponent implements OnInit {

  car$: Observable<Car>;

  constructor(private service: CarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.car$ = this.route.data.pipe(
      map((data: { carById: Car }) => data.carById)
    );
  }
}
