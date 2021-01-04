import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of, Subscription, zip} from 'rxjs';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {

  constructor(private readonly router: Router,
              private service: CarService,
              private favService: FavoritesService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  cars$: Observable<Car[]>;

  helperSub: Subscription;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.helperService.updateCarsList();

    this.combineCarsLists();

    this.helperSub = this.helperService.onCarsListUpdate().subscribe(() => {
      this.combineCarsLists();
    });

    this.subscriptions.push(this.helperSub);


    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );
  }

  combineCarsLists(): void {

    console.log('updating cars');

    this.cars$ = zip(
      this.service.getCarList(),
      this.favService.getFavoriteCars()
    ).pipe(map(([cars, favoriteCars]) => {
      cars.map(car => {
        favoriteCars.map(favoriteCar => {
          if (car.id === favoriteCar.id) {
            car.favorite = true;
          }
        });
      });
      return cars;
    }));

  }

  onAddFavCar(): void {
    this.helperService.updateCarsList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
