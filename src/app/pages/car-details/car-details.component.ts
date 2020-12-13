import {Component, Input, OnInit} from '@angular/core';
import {ServerEmulatorService} from '../../services/server-emulator.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() car: object;

  constructor(private service: ServerEmulatorService,
              private route: ActivatedRoute) { }

  carListFromServer = [];
  selectedCar: object;
  selectedID: string;

  ngOnInit(): void {
    this.carListFromServer = this.service.getCarList();
    this.selectedID = this.route.snapshot.paramMap.get('id');
    this.selectedCar = this.carListFromServer[this.selectedID];
  }

}
