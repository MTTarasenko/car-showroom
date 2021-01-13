import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {AddCar} from '../../store/actions/car.actions';
import {selectFavCarsList} from '../../store/selectors/favorite.selectors';
import {LogOut} from '../../store/actions/login.actions';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, OnDestroy{

  favCars$: Observable<Car[]>;
  faStarRegular = regularStar;


  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private favoriteService: FavoritesService,
              private service: CarService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.favCars$ = this.store.pipe(select(selectFavCarsList));
  }
  ngOnDestroy(): void {}

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new AddCar(result));
      }
    });
  }


  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
