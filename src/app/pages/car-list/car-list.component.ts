import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of, Subscription, zip} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectCarList} from '../../store/selectors/car.selector';
import {GetCars} from '../../store/actions/car.actions';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private readonly router: Router,
              private service: CarService,
              private favService: FavoritesService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              ) {
  }

  sCars$ = this.store.pipe(select(selectCarList));
  cars$: Observable<Car[]>;
  carsAmount: number;
  range: {
    from: number,
    to: number
  };
  helperSub: Subscription;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.range = {
      from: 0,
      to: 4
    };
    this.helperService.updateCarsList();

    this.combineCarsLists();

    this.helperSub = this.helperService.onCarsListUpdate().subscribe(() => {
      this.combineCarsLists();
    });

    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub);

  }

  combineCarsLists(): void {
    this.store.dispatch(new GetCars());


    this.cars$ = zip(
      this.service.getFourCarsAndLength(this.range.from, this.range.to)
        .pipe(map(data => {
          this.carsAmount = data.totalCount;
          return data.cars;
        })),
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

  onPageEvent($event): void {
    this.range = {
      from: (4 * $event.pageIndex),
      to: 4 * ($event.pageIndex + 1)
    };
    this.helperService.updateCarsList();

  }

  onAddFavCar(): void {
    this.helperService.updateCarsList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
