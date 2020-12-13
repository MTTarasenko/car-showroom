import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ServerEmulatorService} from '../../services/server-emulator.service';

import { AddCarModalComponent } from '../../components/add-car-modal/add-car-modal.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit  {

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private service: ServerEmulatorService) {
  }

  carListFromServer;

  ngOnInit(): void {
    this.carListFromServer = this.service.getCarList();
  }

  watchCarDetails(index) {
    this.router.navigate(['/car-details/' + index]);
  }
  addNewCar() {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      data: {carList: this.carListFromServer},
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof result, result);
      if (result) {
        // console.log(this.carListFromServer, this.carListFromServer.push(result));
        this.carListFromServer.push(result);
      }
    });
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
