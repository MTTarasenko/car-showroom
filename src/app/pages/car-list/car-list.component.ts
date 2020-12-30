import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {combineLatest, forkJoin, merge, Observable, of, Subscription} from 'rxjs';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private service: CarService,
              private favService: FavoritesService,
              private activatedRoute: ActivatedRoute) {
  }

  cars$: Observable<Car[]>;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {

    this.combineCarsLists();

    // data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );
  }

  combineCarsLists(): void {
    console.log('updating cars');
    this.cars$ = combineLatest(
      this.service.getCarList(),
      this.favService.getFavoriteCars()
    ).pipe(map(([data1, data2]) => {
      data1.map(itemC => {
        data2.map(itemF => {
          if (itemC.id === itemF.id) {
            itemC.favorite = true;
          }
        });
      });
      return data1;
    }));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
