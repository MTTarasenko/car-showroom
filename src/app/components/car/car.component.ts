import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {FavoritesService} from '../../services/favorites.service';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {

  @Input() car: Car;
  @Output() addCar: EventEmitter<any> = new EventEmitter();
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private service: CarService,
              private favoriteService: FavoritesService) {
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
      this.favoriteService.addFavorite(car).subscribe(() => {
        this.addCar.emit();
      });
    } else {
      this.favoriteService.removeFavorite(car).subscribe(() => {
        this.addCar.emit();
      });
    }
  }

}
