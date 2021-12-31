import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { User } from './auth/models/user.model';
import { getUser, getIsLoggedIn, getIsLoading, getIsAdmin } from './auth/store/auth.selectors';

import * as fromAuth from './auth/store/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<AppState>, translate: TranslateService) {
    translate.addLangs(['en', 'ml']);
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.onLangChange.subscribe(() => {
      if (localStorage.getItem('language')) {
        translate.use(localStorage.getItem('language') + '');
      } else {
        translate.use('en');
      }
    });
  }

  ngOnInit() {
    this.store.select(getUser).subscribe((user) => {
      console.log({user: user});
    })
    this.user$ = this.store.select(getUser);
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
    this.isAdmin$ = this.store.select(getIsAdmin);
  }
  
  ngAfterViewInit() {
    this.isLoading$ = this.store.pipe(select(getIsLoading), debounceTime(0));   
  }

  onLogout(user: User) {
    console.log('user****************', user);
    this.store.dispatch(new fromAuth.LogoutRequested( { user }));
  }

}
