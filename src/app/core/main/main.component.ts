import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<AppState>) { 

  }
  ngOnInit() {
    // this.router.navigateByUrl('expenses'); // for dev purpose only so that current working page loads first
    this.store.select(getUser).subscribe((user: any) => {
      this.isAdmin = user.isAdmin;
      this.role = user.role
    })
  }

}
