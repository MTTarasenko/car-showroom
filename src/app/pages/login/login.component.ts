import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SessionServiceService} from '../../services/session-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionServiceService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private readonly router: Router,
              private service: SessionServiceService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });
  }

  login() {
    const output = this.service.checkUsernameAndPassword(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
    if (output === true) {
      this.router.navigate(['/car-list']);
    } else {
      // this.msg ='Invalid username or password';
    }
    this.router.navigate(['/car-list']);
  }
}
