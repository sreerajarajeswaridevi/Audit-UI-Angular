import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import * as actions from './../../store/auth.actions';
import { Observable } from 'rxjs';
import { getError } from '../../store/auth.selectors';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { getIsLoading } from 'src/app/auth/store/auth.selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  selectedLanguage = 'en';

  constructor(private store: Store<AppState>, private translate: TranslateService) { }

  ngOnInit() {
    const cachedUsername = localStorage.getItem('username');
    const cachedPassword = localStorage.getItem('password');
    if (localStorage.getItem('language')) {
      this.selectedLanguage = localStorage.getItem('language') + '';
      this.setLanguage(this.selectedLanguage);
    }
    if (cachedUsername && cachedPassword) {
      this.store.dispatch(new actions.LoginRequested({
        username: cachedUsername,
        password: cachedPassword
      }));
    }
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
    this.isLoading$ = this.store.select(getIsLoading);


    this.error$ = this.store
      .pipe(
        select(getError),
        map( (error: any) => {
          if (error && (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')) {
            return 'Invalid login or password';
          } else {
            return null;
          }
        })
      );
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onLogin() {
    if (this.loginForm.valid) {
      const request = {...this.loginForm.value};
      request.password = CryptoJS.SHA256(request.password)
      this.store.dispatch(new actions.LoginRequested(request));
    }
  }

  onGoogleLogin(authProvider: string) {
    this.store.dispatch(new actions.SocialLogin({ authProvider }));
  }

  onFacebookLogin(authProvider: string) {
    this.store.dispatch(new actions.SocialLogin({ authProvider }));
  }

  onTwitterLogin(authProvider: string) {
    this.store.dispatch(new actions.SocialLogin({ authProvider }));
  }

  setLanguage(language: string) {
    this.selectedLanguage = language;
    localStorage.setItem('language', language);
    this.translate.use(language);
  }


}
