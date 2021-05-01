import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading } from '../store/donations.selectors';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

}
