import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CarService} from './car.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Car} from '../models/car';

@Injectable()
export class GetCarByIdResolverService {

  constructor(private service: CarService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Car> {
    return this.service.getCarById(Number(route.paramMap.get('id'))).pipe(
      map(data => {
        console.log(data);
        if (data) {
          return data;
        } else {
          this.router.navigate(['/car-list/']);
        }
      })
    );
  }
}
