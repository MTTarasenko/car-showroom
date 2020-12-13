import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerEmulatorService {

  carList = [
    {
      name: 'Toyota Supra',
      photoURL: 'https://cdn.motor1.com/images/mgl/YozWJ/s3/2020-gr-supra-2-0l-turbo.jpg',
      description: 'I’ve always been asked, ‘What is my favorite car?’ and I’ve always said ‘The next one.’',
      year: '2020'
    },
    {
      name: 'Toyota Corolla',
      photoURL: 'https://auto.vercity.ru/gallery/img/automobiles/Toyota/2020%20Toyota%20Corolla%20Hatchback%20Special%20Edition%20(NA)/900x/1591896613.jpg',
      description: 'Meet Corolla Hatchback in its most expressive form. The 2021 Special Edition has the style elements you\'ve been looking for, dressing up Corolla Hatchback\'s familiar build with exterior additions including a sporty front splitter, side skirts, rear bumper garnish and the popular rear spoiler',
      year: '2020'
    },
    {
      name: 'Toyota Corolla AE86',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ae86_tureno.jpg',
      description: 'With 123bhp from its 1.6-litre four-pot, you’d be forgiven for writing the AE86 off as slow - although to do so would be to miss the point of the car completely. But in reality it feels much more sprightly than its specifications would have you believe.',
      year: '2000'
    },
    {
      name: 'Toyota Hilux',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg/1200px-2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg',
      description: 'a series of pickup trucks produced and marketed by the Japanese automobile manufacturer Toyota.',
      year: '2016'
    },
    {
      name: 'Toyota Camry',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
      description: 'The name "Camry" derives from the Japanese word kanmuri (ja:冠, かんむり), meaning "crown".',
      year: '2018'
    }
  ];

  constructor() {
  }

  getCarList() {
    return this.carList;
  }
}
