import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading } from '../store/expenses.selectors';
var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  expense: any = {};
  defaultDate = moment();
  startDate = moment();
  endDate = moment().add('30', 'days');
  selectedDate = moment().format('dddd DD/MM/YYYY');

  @ViewChild('expenseForm', { static: true }) expenseForm: NgForm;


  constructor(
    private store: Store<AppState>,
  ) {}

  
  datePicked(date: any) {
    this.selectedDate = date.format('dddd DD/MM/YYYY');
  }

  dateClicked(date: any) {
    console.log(date);
  }


  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

}
