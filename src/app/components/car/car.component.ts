import {Component, Input} from '@angular/core';
import {Car} from '../../models/car';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;

  constructor(private readonly router: Router,
              private favoriteService: FavoritesService) {
  }

  addingFavoriteSub: Subscription;

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addFavorite(car): void {
    this.addingFavoriteSub = this.favoriteService.addFavorite(car).subscribe();
  }

}
