import {Injectable} from '@angular/core';
import {Car} from '../models/car';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerEmulatorService {


  constructor(private http: HttpClient) {
  }

  getCarList(): Observable<Car[]> {
    return this.http.get('assets/cars.json').pipe(map(data => {
      const carList = data['carList'];
      return carList.map( (car: any) => {
        return {
          id: car.id,
          name: car.name,
          photoURL: car.photoURL,
          description: car.description,
          year: car.year
        };
      });
    }));
  }
  getCarById(carID: number): Observable<Car> {
    return this.getCarList()
      .pipe(
        map(car => car.find(car => car.id === carID))
      );
  }
}
