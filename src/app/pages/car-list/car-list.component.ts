import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ServerEmulatorService} from '../../services/server-emulator.service';
import {AddCarModalComponent} from '../../components/add-car-modal/add-car-modal.component';
import {Car} from '../../models/car';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private service: ServerEmulatorService) {
  }

  cars: Car[] = [];
  val: Car ;


  ngOnInit(): void {
    this.service.getCarList().subscribe(data => this.cars = data);
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px'
    });


    dialogRef.afterClosed().pipe(
      switchMap(result => {
        return this.service.addNewCar(result);
      })
    ).subscribe();
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
