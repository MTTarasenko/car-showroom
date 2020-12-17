import {Component, Input, OnInit} from '@angular/core';
import {ServerEmulatorService} from '../../services/server-emulator.service';
import {ActivatedRoute} from '@angular/router';
import {Car} from '../../models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  car: Car;

  constructor(private service: ServerEmulatorService,
              private route: ActivatedRoute) { }

  selectedID: number;

  ngOnInit(): void {
    this.selectedID = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getCarById(this.selectedID).subscribe(data => this.car = data);
  }

}
