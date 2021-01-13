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
import {SetPageInfo, SetTotalCount} from '../../store/actions/range.actions';
import {selectPageInfo, selectTotalCount} from '../../store/selectors/range.selectors';
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

  pageState$ = this.store.pipe(select(selectPageInfo));
  sCars$ = this.store.pipe(select(selectCarList));
  carsAmount$ = this.store.pipe(select(selectTotalCount));
  helperSub: Subscription;
  subscriptions: Subscription[] = [];
  amountOfCarsOnPage: number[] = [4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {

    this.helperSub = this.store.pipe(select(selectPageInfo)).subscribe(() => {
      this.store.dispatch(new GetCars());
    });
    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub);
  }

  onPageEvent($event): void {
    this.store.dispatch(new SetPageInfo({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
