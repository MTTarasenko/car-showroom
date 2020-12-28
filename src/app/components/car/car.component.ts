import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {FavoritesService} from '../../services/favorites.service';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;
  isFavorite: Observable<boolean>;
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private favoriteService: FavoritesService) {
  }

  addingFavoriteSub: Subscription;

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addFavorite(cCar): void {
    this.addingFavoriteSub = this.favoriteService.addFavorite(cCar).subscribe(result => {
      result.map(value => {
        this.isFavorite = new Observable(observer => {
          if (cCar.id === value.id) {
            return observer.next(true);
          } else {
            return observer.next(false);
          }
        });
      });
      console.log(result);
    });
  }

}
