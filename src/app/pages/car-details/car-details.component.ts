import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  car: Car;

  constructor(private service: CarService,
              private route: ActivatedRoute) {
  }

  selectedID: number;
  subscription: Subscription;

  ngOnInit(): void {
    this.selectedID = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.service.getCarById(this.selectedID)
      .subscribe(data => this.car = data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
