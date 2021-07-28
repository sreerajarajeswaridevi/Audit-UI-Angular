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
import { NgxIndexedDBService } from 'ngx-indexed-db';

var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;
  
  expenseDate = moment();
  salaryDate = moment();

  defaultDate = moment();
  startDate = moment().subtract(60, 'days');
  endDate = moment().add('30', 'days');
  selectedDate = moment();
  
  expense: any = {
    ist_YYYYMMDD: moment().format('YYYY-MM-DD')
  };
  salary: any = {
    item: 'Salary',
    description: '',
    cost: '',
    ist_YYYYMMDD: moment().format('YYYY-MM-DD')
  };

  todaysExpenseList: Expenses[];

  frequentExpenses: Array<string>
  frequentSalaries: Array<any>

  @ViewChild('expenseForm', { static: true }) expenseForm: NgForm;
  @ViewChild('salaryForm', { static: true }) salaryForm: NgForm;
  
  private modalRef: MDBModalRef;


  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private idbService: NgxIndexedDBService
  ) {}

  get formattedDate() {
    return this.selectedDate.format('dddd DD/MM/YYYY');
  }

  dateClicked(event: any) {
    console.log(event);
  }

  expDatePicked(date: any) {
    this.expenseDate = date;
    this.expense.ist_YYYYMMDD = date.format('YYYY-MM-DD');
  }

  salDatePicked(date: any) {
    this.salaryDate = date;
    this.salary.ist_YYYYMMDD = date.format('YYYY-MM-DD');
  }
  
  datePicked(date: any) {
    this.selectedDate = date;
    this.store.dispatch(new fromExpenses.ExpensesQuery(date.format('YYYY-MM-DD')));
  }

  prevDate() {
    this.datePicked(this.selectedDate.subtract('1', 'days'));
  }

  nextDate() {
    this.datePicked(this.selectedDate.add('1', 'days'));
  }

  ngOnInit(): void {
    this.store.select(getExpenses).subscribe((exp: Expenses[]) => {
      this.todaysExpenseList = exp;
      this.fetchFrequentExpenses();
      this.fetchFrequentSalaries();
    });
    this.isLoading$ = this.store.select(getIsLoading);
    this.isManager$ = this.store.select(isManager);
    this.store.dispatch(new fromExpenses.ExpensesQuery(this.selectedDate.format('YYYY-MM-DD')));
  }

  fetchFrequentExpenses() {
    this.idbService
      .getAll('expenses')
      .subscribe((expense: any) => {
        if (expense && expense.length > 0) {
          expense = expense.sort((a: any, b: any) => {
            if (a.frequency > b.frequency) {
              return -1;
            } else if (a.frequency > b.frequency){
              return 1;
            }
            return 0;
          }).splice(0, 5);
          this.frequentExpenses = expense.map((data: any) => data.item);
        }
      });
  }

  fetchFrequentSalaries() {
    this.idbService
      .getAll('salary')
      .subscribe((salary: any) => {
        if (salary && salary.length > 0) {
          this.frequentSalaries = salary.sort((a: any, b: any) => {
            if (a.frequency > b.frequency) {
              return -1;
            } else if (a.frequency > b.frequency){
              return 1;
            }
            return 0;
          }).splice(0, 5);
        }
      });
  }

  onSave() {
    this.store.dispatch(new fromExpenses.ExpensesAddQuery(this.expense));
    const expenseCopy = JSON.parse(JSON.stringify(this.expense));
    this.idbService
      .getByKey('expenses', expenseCopy.item)
      .subscribe((data) => {
        if (!data) {
          this.idbService.add('expenses', {
            item: expenseCopy.item,
            frequency: 1
          })
        } else {
          this.idbService.update('expenses',
          {
            item: expenseCopy.item,
            frequency: (data as any).frequency + 1
          }, (data as any).key)
        }
      });
      this.expense = {
        ist_YYYYMMDD: moment().format('YYYY-MM-DD')
      };
      this.expenseForm.reset();
      this.selectedDate = moment();
      this.expenseDate = moment();
  }

  resetAll() {
    
    
  }

  getTotalExpense() {
    if (this.todaysExpenseList && this.todaysExpenseList.length > 0) {
      return this.todaysExpenseList.reduce(((prev ,current: any) => +(current.cost) + prev), 0);
    }
    return '0';
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

  onSalarySave(form: NgForm) {
    this.store.dispatch(new fromExpenses.ExpensesAddQuery(this.salary));
    const salaryCopy = JSON.parse(JSON.stringify(this.salary));
    this.idbService
      .getByKey('salary', salaryCopy.description)
      .subscribe((data) => {
        if (!data) {
          this.idbService.add('salary', {
            person: salaryCopy.description,
            amount: salaryCopy.cost,
            frequency: 1
          })
        } else {
          this.idbService.update('salary',
          {
            person: salaryCopy.description,
            amount: salaryCopy.cost,
            frequency: (data as any).frequency + 1
          }, (data as any).key)
        }
      });

    this.salary = {
      item: 'Salary',
      description: '',
      cost: '',
      ist_YYYYMMDD: moment().format('YYYY-MM-DD')
    };
    form.reset();
    this.salaryDate = moment();
    this.salary = {};
  }
}
