import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Car} from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  carListArray: Car[] = [
    {
      id: 10,
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve Toyota been asked, ‘What is my Toyota car?’ and Toyota’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      id: 11,
      name: 'Toyota Corolla',
      photoURL: 'https://auto.vercity.ru/gallery/img/automobiles/Toyota/2020%20Toyota%20Corolla%20Hatchback%20Special%20Edition%20(NA)/900x/1591896613.jpg',
      description: 'Meet Corolla Hatchback in its most expressive form. The 2021 Special Edition has the style elements you\'ve been looking for, dressing up Corolla Hatchback\'s familiar build with exterior additions including a sporty front splitter, side skirts, rear bumper garnish and the popular rear spoiler',
      year: '2020'
    },
    {
      id: 12,
      name: 'Toyota Corolla AE86',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ae86_tureno.jpg',
      description: 'With 123bhp from its 1.6-litre four-pot, you’d be forgiven for writing the AE86 off as slow - although to do so would be to miss the point of the car completely. But in reality it feels much more sprightly than its specifications would have you believe.',
      year: '2000'
    },
    {
      id: 13,
      name: 'Toyota Hilux',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg/1200px-2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg',
      description: 'a series of pickup trucks produced and marketed by the Japanese automobile manufacturer Toyota.',
      year: '2016'
    },
    {
      id: 14,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ae86_tureno.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 15,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 16,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 17,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 18,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 19,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ae86_tureno.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 20,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 21,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 22,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 23,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 24,
      name: 'Toyota Camry',
      photoURL: 'https://auto.vercity.ru/gallery/img/automobiles/Toyota/2020%20Toyota%20Corolla%20Hatchback%20Special%20Edition%20(NA)/900x/1591896613.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 25,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 26,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 27,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg/1200px-2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 28,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 29,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 30,
      name: 'Toyota Camry',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 31,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 32,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg/1200px-2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
    {
      id: 33,
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    },
  ];

  availableYears: number[] = [
    1997,
    1998,
    1999,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
  ];

  constructor() {
  }

  getCarList(): Observable<Car[]> {
    console.log('getting car list...');
    return of(this.carListArray.map(item => ({...item})));
  }

  getFourCarsAndLength(from: number, to: number): Observable<{ totalCount: number, cars: Car[] }> {
    console.log('getting car list...');
    const cars = this.carListArray
      .slice(from, to)
      .map(item => ({...item}));
    return of({totalCount: this.carListArray.length, cars});
  }

  getCarYears(): Observable<number[]> {
    return of(this.availableYears);
  }

  getCarById(carID: number): Observable<Car> {
    return of(this.carListArray.find(car => car.id === carID));
  }


  addNewCar(newCar: Car): Observable<boolean> {
    return new Observable(observer => {
      if (newCar.photoURL) {
        const car = {...newCar};
        car.id = this.carListArray[this.carListArray.length - 1].id + 1;
        this.carListArray.push(car);
        return observer.next(true);
      } else {
        return observer.next(false);
      }
    });
  }
}

