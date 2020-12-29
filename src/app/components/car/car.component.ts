import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';

import {FavoritesService} from '../../services/favorites.service';
import {Car} from '../../models/car';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {

  @Input() car: Car;
  isFavorite: boolean;
  faStarSolid = solidStar;
  faStarRegular = regularStar;

  constructor(private readonly router: Router,
              private favoriteService: FavoritesService) {
  }

  addingFavoriteSub: Subscription;
  checkIfFavoriteSub: Subscription;

  ngOnInit(): void {
    this.checkFavorite();
  }

  ngOnDestroy(): void {
    this.checkIfFavoriteSub.unsubscribe();
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  checkFavorite(): void {
    this.checkIfFavoriteSub = this.favoriteService.checkIfFavorite(this.car.id).pipe(
      map(data => this.isFavorite = data)
    ).subscribe();
  }

  addFavorite(cCar): void {
    this.addingFavoriteSub = this.favoriteService.addFavorite(cCar).subscribe(result => {
      if (result) {
        this.checkFavorite();
      }
    });
  }

}
