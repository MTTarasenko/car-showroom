import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of, Subscription, zip} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

import {CarService} from '../../services/car.service';
import {Car} from '../../models/car';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private readonly router: Router,
              private service: CarService,
              private favService: FavoritesService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  cars$: Observable<Car[]>;
  pagedList$: Observable<Car[]>;
  helperSub: Subscription;
  subscriptions: Subscription[] = [];
  startIndex: number;
  endIndex: number;

  ngOnInit(): void {
    this.helperService.updateCarsList();

    this.combineCarsLists();

    this.helperSub = this.helperService.onCarsListUpdate().subscribe(() => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.combineCarsLists(startIndex, endIndex);
    });


    this.cars$ = this.service.getCarList().pipe(map(data => data));

    // TODO data from resolver
    // this.cars$ = this.activatedRoute.data.pipe(
    //   map((data: { cars: Car[] }) => data.cars)
    // );

    this.subscriptions.push(this.helperSub);

  }

  ngAfterViewInit(): void {
    this.startIndex = this.paginator.pageIndex;
    this.endIndex = this.paginator.pageSize;
    // console.log('paginator', this.paginator);
  }

  combineCarsLists(startIndex = 0, endIndex = 4): void {

    console.log('updating cars', startIndex, endIndex);

    // this.cars$ = zip(
    //   this.service.getCarList(),
    //   this.favService.getFavoriteCars()
    // ).pipe(map(([cars, favoriteCars]) => {
    //   cars.map(car => {
    //     favoriteCars.map(favoriteCar => {
    //       if (car.id === favoriteCar.id) {
    //         car.favorite = true;
    //       }
    //     });
    //   });
    //   return cars.slice(0, 4);
    // }));

    this.pagedList$ = zip(
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
      return cars.slice(startIndex, endIndex);
    }));

  }

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.cars$.pipe(map(data => {
      if (endIndex > data.length) {
        endIndex = data.length;
      }
      this.combineCarsLists(startIndex, endIndex);
      // this.pagedList$ = this.pagedList$.pipe(map(result => {
      //   console.log(startIndex, endIndex);
      //   return data.slice(startIndex, endIndex);
      // }));
    })).subscribe();
  }

  onAddFavCar(): void {
    this.helperService.updateCarsList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
