import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {ServerEmulatorService} from '../../services/server-emulator.service';
import {map, switchMap} from 'rxjs/operators';
import {Car} from '../../models/car';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {

  cars$: Car[];
  favCars: Car[] = [];
  favCarsObs: Observable<Car[]>;


  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private service: ServerEmulatorService) {
  }

  favCarsCounter = 0;

  ngOnInit(): void {

    this.service.getLocalCarList().pipe(
      map(data => {
        this.cars$ = data;
        // this.favCarsObs = of(data.filter(item => item.favorite === true));
      })
    ).subscribe();
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px'
    });


    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this.service.addNewCar(result);
        }
      })
    ).subscribe();
  }


  logOut(): void {
    this.authService.logOut();
  }

}
