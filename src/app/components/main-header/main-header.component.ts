import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {CarService} from '../../services/car.service';
import {FavoritesService} from '../../services/favorites.service';
import {HelperService} from '../../services/helper.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {AddCar, GetCars} from '../../store/actions/car.actions';
import {selectFavCarsList} from '../../store/selectors/favorite.selectors';
import {LogOut} from '../../store/actions/login.actions';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit{

  favCars$ = this.store.pipe(select(selectFavCarsList));
  faStarRegular = regularStar;


  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private favoriteService: FavoritesService,
              private service: CarService,
              private helperService: HelperService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectFavCarsList)).subscribe(() => {
      this.store.dispatch(new GetCars());
    });
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new AddCar(result));
        this.helperService.updateCarsList();
      }
    });
  }


  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
