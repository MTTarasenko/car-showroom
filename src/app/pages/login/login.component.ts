import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionServiceService} from '../../services/session-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionServiceService]
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router,
              private service: SessionServiceService) { }

  ngOnInit(): void {
  }

  login(uname: string, p: string) {
    const output = this.service.checkUsernameAndPassword(uname, p);
    if (output === true)
    {
      this.router.navigate(['/car-list']);
    }
    else{
      // this.msg ='Invalid username or password';
    }
    // this.router.navigate(['/car-list']);
  }
}
