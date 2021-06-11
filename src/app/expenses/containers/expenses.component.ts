import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getExpenses, getIsLoading } from '../store/expenses.selectors';
import * as fromExpenses from '../store/expenses.actions';
import { isManager } from '../../auth/store/auth.selectors';
import { Expenses } from '../models/expenses.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { take } from 'rxjs/operators';

var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;
  expense: any = {};
  defaultDate = moment();
  startDate = moment();
  endDate = moment().add('30', 'days');
  selectedDate = moment().format('dddd DD/MM/YYYY');

  todaysExpenseList: Expenses[];

  @ViewChild('expenseForm', { static: true }) expenseForm: NgForm;
  private modalRef: MDBModalRef;


  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {}

  
  datePicked(date: any) {
    this.selectedDate = date.format('dddd DD/MM/YYYY');
  }

  dateClicked(date: any) {
    console.log(date);
  }


  ngOnInit(): void {
    this.store.select(getExpenses).subscribe((exp: Expenses[]) => {
      this.todaysExpenseList = exp;
    });
    this.isLoading$ = this.store.select(getIsLoading);
    this.isManager$ = this.store.select(isManager);
    this.store.dispatch(new fromExpenses.ExpensesQuery(moment().format('YYYY-MM-DD')));
    
  }

  onSave() {
    this.store.dispatch(new fromExpenses.ExpensesAddQuery(this.expense));
    this.expense = {};
    this.expenseForm.reset();
  }

  getTotalExpense() {
    if (this.todaysExpenseList && this.todaysExpenseList.length > 0) {
      return this.todaysExpenseList.reduce(((prev ,current: any) => +(current.cost) + prev), 0);
    }
    return '';
  }

  onDelete(uuid: string) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,{class: 'modal-dialog-centered'}
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(new fromExpenses.ExpensesDeleted({ uuid: uuid }));
        }
      });
  }
}
