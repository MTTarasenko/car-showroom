import {Component, Input} from '@angular/core';
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
import {AddCarToFav, RemoveCarFromFav} from '../../store/actions/favorite.actions';
import {HelperService} from '../../services/helper.service';
import {GetCar} from '../../store/actions/car.actions';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private service: CarService,
              private favoriteService: FavoritesService,
              private helperService: HelperService,
              private store: Store<AppState>) {
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }


  toggleFavorite(car): void {
    if (!car.favorite) {
      this.store.dispatch(new AddCarToFav(car));
    } else {
      this.store.dispatch(new RemoveCarFromFav(car));
    }
    this.helperService.updateCarsList();
  }

}
