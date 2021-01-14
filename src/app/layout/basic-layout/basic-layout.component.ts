import {Component, OnInit} from '@angular/core';
import {GetCars} from '../../store/actions/car.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('init2');
    this.store.dispatch(new GetCars());
  }
}
