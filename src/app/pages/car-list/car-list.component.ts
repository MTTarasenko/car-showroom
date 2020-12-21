import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {ServerEmulatorService} from '../../services/server-emulator.service';
import {AddCarModalComponent} from '../../components/add-car-modal/add-car-modal.component';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {

  constructor(private readonly router: Router,
              public dialog: MatDialog,
              private service: ServerEmulatorService,
              private activatedRoute: ActivatedRoute) {
  }

  cars: Car[] = [];

  subscriptions: Subscription[] = [];
  mainSubscription: Subscription;
  newCarSubscription: Subscription;

  ngOnInit(): void {
    this.mainSubscription = this.activatedRoute.data
      .subscribe((data: { cars: Car[] }) => this.cars = data.cars);
  }

  ngOnDestroy(): void {
    this.subscriptions.push(this.mainSubscription);
    if (this.newCarSubscription) {
      this.subscriptions.push(this.newCarSubscription);
    }
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  watchCarDetails(index): void {
    this.router.navigate(['/car-details/' + index]);
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarModalComponent, {
      width: '500px'
    });


    this.newCarSubscription = dialogRef.afterClosed().pipe(
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
