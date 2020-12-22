import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuardService} from '../../guards/auth-guard.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private readonly router: Router,
              private authService: AuthGuardService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
  }

}
