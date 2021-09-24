import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('{{time}}ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('100ms', style({ transform: 'translateY(100%)', opacity: 0 })),
      ]),
    ]),
  ],
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
