import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

import {AuthGuardService} from '../../guards/auth-guard.service';
import {AddCarModalComponent} from '../add-car-modal/add-car-modal.component';
import {ServerEmulatorService} from '../../services/server-emulator.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public isOnCarDetails$: Observable<boolean>;

  constructor(public readonly router: Router,
              private authService: AuthGuardService,
              public dialog: MatDialog,
              private service: ServerEmulatorService) {
  }

  ngOnInit(): void {

    if (this.router.isActive('car-details', false)) {
      this.isOnCarDetails$ = new Observable<boolean>(
        observer => {
          return observer.next(true);
        }
      );
    }

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOnCarDetails$ = new Observable(observer => {
          if (event.url.includes('car-details')) {
            return observer.next(true);
          } else {
            return observer.next(false);
          }
        });
      });
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
