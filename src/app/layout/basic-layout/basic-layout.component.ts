import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {AuthGuardService} from '../../guards/auth-guard.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit {

  constructor(public authService: AuthGuardService) { }

  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}
