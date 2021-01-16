import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectCarList, selectCarsAmount, selectLoading, selectPageState} from '../../store/selectors/car-list.selector';
import {GetCars, SetLoading, SetPageInfo} from '../../store/actions/car.actions';
import {PageModel} from '../../models/page.model';
import {Car} from '../../models/car';
import {selectSelectedCarLoading} from '../../store/selectors/car-details.selectors';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss', '../../components/car/car.component.scss'],
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

  pageState$: Observable<PageModel>;
  sCars$: Observable<Car[]>;
  carsAmount$: Observable<number>;
  isLoading$: Observable<boolean>;
  isSelectedCarLoading$: Observable<boolean>;
  amountOfCarsOnPage: number[] = [4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.store.dispatch(new GetCars());
    this.pageState$ = this.store.pipe(select(selectPageState));
    this.sCars$ = this.store.pipe(select(selectCarList)).pipe(map(data => {
      // stop showing spinner
      if (data) {
        this.store.dispatch(new SetLoading(false));
        return data;
      }
    }));
    this.carsAmount$ = this.store.pipe(select(selectCarsAmount));
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.isSelectedCarLoading$ = this.store.pipe(select(selectSelectedCarLoading));
    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );
  }

  onPageEvent($event): void {
    this.store.dispatch(new SetPageInfo({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }));
  }

  ngOnDestroy(): void {}
}
