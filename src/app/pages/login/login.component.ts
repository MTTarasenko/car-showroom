import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SessionService} from '../../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [SessionService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private readonly router: Router,
              private service: SessionService,
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
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    });
  }

  login(): void {
    const output = this.service.checkUsernameAndPassword(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
    if (output) {
      this.router.navigate(['/car-list']);
    } else {

    }
  }
}
