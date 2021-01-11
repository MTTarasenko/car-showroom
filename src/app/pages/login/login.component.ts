import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SessionService} from '../../services/session.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {GetLogin} from '../../store/actions/login.actions';


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
              private fb: FormBuilder,
              private store: Store<AppState>) {
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
    this.store.dispatch(new GetLogin([this.loginForm.controls.username.value, this.loginForm.controls.password.value]));
  }
}
