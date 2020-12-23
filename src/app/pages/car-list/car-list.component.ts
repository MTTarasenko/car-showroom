import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

import {ServerEmulatorService} from '../../services/server-emulator.service';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private service: ServerEmulatorService,
              private activatedRoute: ActivatedRoute) {
  }

  cars$: Observable<Car[]>;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.cars$ = this.activatedRoute.data.pipe(
      map((data: { cars: Car[] }) => data.cars )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addFavorite(car): void {
    this.service.addFavorite(car).subscribe();
  }
}
