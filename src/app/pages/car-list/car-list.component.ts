import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {concat, forkJoin, merge, Observable, Subscription, zip} from 'rxjs';

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
  cars: Car[];
  favCars$: Observable<Car[]>;
  favCars: Car[];
  carsWithFavorites$: Observable<Car[]>;
  carsWithFavorites: Car[];

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.cars$ = this.activatedRoute.data.pipe(
      map((data: { cars: Car[] }) => data.cars)
    );

    this.favCars$ = this.favoriteService.getFavoriteCars();

    this.cars$.pipe(map(data => this.cars = data)).subscribe();
    this.favCars$.pipe(map(data => this.favCars = data)).subscribe();
    this.cars.forEach(itemC => {
      this.favCars.forEach(itemF => {
       if (itemC.id === itemF.id) {
         itemC.favorite = itemF.favorite;
       }
      });
    });
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
