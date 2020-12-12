import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }
  goBack() {
    // this.router.navigate(['/car-list'])
  }
}
