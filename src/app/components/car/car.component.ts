import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {Store} from '@ngrx/store';

import {FavoritesService} from '../../services/favorites.service';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';
import {CarService} from '../../services/car.service';
import {AppState} from '../../store/state/app.state';
import {AddCarToFav} from '../../store/actions/car.actions';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {

  @Input() car: Car;
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private service: CarService,
              private favoriteService: FavoritesService,
              private helperService: HelperService,
              private store: Store<AppState>) {
  }

  addingFavoriteSub: Subscription;
  checkIfFavoriteSub: Subscription;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }


  toggleFavorite(car): void {
    if (!car.favorite) {
      this.store.dispatch(new AddCarToFav(car));
      // this.favoriteService.addFavorite(car).subscribe(() => {
      //   this.addCar.emit();
      // });
    } else {
      // this.favoriteService.removeFavorite(car).subscribe(() => {
      //   this.addCar.emit();
      // });
    }
    this.helperService.updateCarsList();
  }

}
