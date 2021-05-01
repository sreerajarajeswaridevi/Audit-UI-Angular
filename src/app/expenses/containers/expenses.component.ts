import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading } from '../store/expenses.selectors';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

}
