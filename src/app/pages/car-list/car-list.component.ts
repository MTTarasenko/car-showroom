import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

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
              private favoriteService: FavoritesService,
              private activatedRoute: ActivatedRoute) {
  }

  cars$: Observable<Car[]>;
  favCars$: Observable<Car[]>;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.cars$ = this.activatedRoute.data.pipe(
      map((data: { cars: Car[] }) => data.cars)
    );

    this.favCars$ = this.favoriteService.getFavoriteCars();

    // this.cars$.pipe(map(dataC => dataC.filter(itemC => {
    //   this.favCars$.pipe(map(dataF => dataF.filter(itemF => {
    //     if (itemC.id === itemF.id) {
    //       itemC.favorite = true;
    //     } else {
    //       itemC.favorite = false;
    //     }
    //   } )));
    // })));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addFavorite(car): void {
    this.favoriteService.addFavorite(car).subscribe();
  }
}
