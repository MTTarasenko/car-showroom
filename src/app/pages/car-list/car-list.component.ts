import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectCarList, selectCarsAmount} from '../../store/selectors/car.selector';
import {GetCars} from '../../store/actions/car.actions';
import {SetPageCount, SetPageState} from '../../store/actions/range.actions';
import {selectPageCount, selectPageState} from '../../store/selectors/range.selectors';
import {Car} from '../../models/car';

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
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
  ) {
  }

  carsOnPage$ = this.store.pipe(select(selectPageCount));
  currentPage$ = this.store.pipe(select(selectPageState));
  sCars$ = this.store.pipe(select(selectCarList));
  carsAmount$ = this.store.pipe(select(selectCarsAmount));
  helperSub: Subscription;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // set amount of cars on one page
    this.store.dispatch(new SetPageCount(4));

    this.helperSub = this.store.pipe(select(selectPageState)).subscribe(() => {
      this.store.dispatch(new GetCars());
    });
    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub);
  }

  // combineCarsLists(): void {
  //
  //   this.cars$ = zip(
  //     this.sCars$.pipe(map(cars => cars.map(car => ({...car})))),
  //     this.favCars$,
  //   ).pipe(map(([cars, favoriteCars]) => {
  //     (cars).map(car => {
  //       favoriteCars.map(favoriteCar => {
  //         if (car.id === favoriteCar.id) {
  //           car.favorite = true;
  //         }
  //       });
  //     });
  //     return cars;
  //   }));
  // }

  onPageEvent($event): void {
    this.store.dispatch(new SetPageState($event.pageIndex));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
