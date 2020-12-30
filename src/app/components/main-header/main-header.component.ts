import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map, switchMap} from 'rxjs/operators';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {Observable, of} from 'rxjs';

import {Car} from '../../models/car';
import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {


  favCars$: Observable<Car[]>;
  faStarRegular = regularStar;


  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private favoriteService: FavoritesService,
              private service: CarService,
              private helperService: HelperService) {
  }


  ngOnInit(): void {
    this.favCars$ = this.favoriteService.getFavoriteCars();
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          this.service.getCarList().pipe(map(data => data));
          return this.service.addNewCar(result);
        } else {
          return of();
        }
      })
    ).subscribe(result => {
      this.helperService.updateCarsList(true);
      // this.carList.combineCarsLists();
      // console.log(result);
    });
  }


  logOut(): void {
    this.authService.logOut();
  }

}
