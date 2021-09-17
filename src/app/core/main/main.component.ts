import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isAdmin = false;
  role = '';

  constructor(private store: Store<AppState>, translate: TranslateService) { 

    translate.addLangs(['en', 'ml']);
    translate.setDefaultLang('ml');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ml');
  }
  ngOnInit() {
    // this.router.navigateByUrl('expenses'); // for dev purpose only so that current working page loads first
    this.store.select(getUser).subscribe((user: any) => {
      this.isAdmin = user.isAdmin;
      this.role = user.role
    })
  }

}
