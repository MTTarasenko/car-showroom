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
import {selectCarList, selectCarsAmount} from '../../store/selectors/car.selector';
import {AddCarToFav, GetCars, GetCarsCount} from '../../store/actions/car.actions';

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
  newCars: Car[];
  carsAmount$ = this.store.pipe(select(selectCarsAmount));
  range: {
    from: number,
    to: number
  };
  helperSub: Subscription;
  carsSub: Subscription;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // this.carsAmount$ = this.store.pipe(select(selectCarsAmount));
    this.store.dispatch(new GetCarsCount());
    this.range = {
      from: 0,
      to: 4
    };
    this.helperService.updateCarsList();

    this.combineCarsLists();

    this.helperSub = this.helperService.onCarsListUpdate().subscribe(() => {
      this.combineCarsLists();
    });

    this.carsSub = this.sCars$.subscribe(result => {
      // this.carsAmount = result.totalCount;
      this.newCars = result.map(item => ({...item}));
    });

    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub, this.carsSub);

  }

  combineCarsLists(): void {
    this.store.dispatch(new GetCars([this.range.from, this.range.to]));

    this.favService.getFavoriteCars().subscribe(data => {
      data.map(favCar => {
        this.newCars.map(car => {
          if (car.id === favCar.id) {
            car.favorite = true;
          }
          return car;
        });
      });
    });
    // this.cars$ = zip(
    //   this.service.getFourCarsAndLength(this.range.from, this.range.to)
    //     .pipe(map(data => {
    //       this.carsAmount = data.totalCount;
    //       return data.cars;
    //     })),
    //   this.favService.getFavoriteCars()
    // ).pipe(map(([cars, favoriteCars]) => {
    //   cars.map(car => {
    //     favoriteCars.map(favoriteCar => {
    //       if (car.id === favoriteCar.id) {
    //         car.favorite = true;
    //       }
    //     });
    //   });
    //   return cars;
    // }));
  }

  onPageEvent($event): void {
    this.range = {
      from: (4 * $event.pageIndex),
      to: 4 * ($event.pageIndex + 1)
    };
    this.helperService.updateCarsList();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
