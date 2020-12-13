import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { AddCarModalComponent } from '../../components/add-car-modal/add-car-modal.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {

  constructor(private readonly router: Router,
              public dialog: MatDialog) {
  }

  watchCarDetails() {
    this.router.navigate(['/car-details']);
  }
  addNewCar() {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
