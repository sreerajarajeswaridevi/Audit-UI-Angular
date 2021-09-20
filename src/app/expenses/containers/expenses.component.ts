import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getExpenses, getIsLoading } from '../store/expenses.selectors';
import * as fromExpenses from '../store/expenses.actions';
import { getUser, isManager } from '../../auth/store/auth.selectors';
import { Expenses } from '../models/expenses.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { take } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PrinterComponent } from 'src/app/shared/components/printer/printer.component';
import { User } from 'src/app/auth/models/user.model';
import { ExpensesService } from '../services/expenses.service';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;
  user: User;
  
  expenseDate = moment();
  salaryDate = moment();

  defaultDate = moment();
  startDate = moment().subtract(60, 'days');
  endDate = moment().add('30', 'days');
  selectedDate = moment();
  
  modalConfig = {
    containerClass: 'center',
    class: 'modal-dialog-centered center modal-lg',
    animated: true,
  };
  
  expense: any = {
    ist_YYYYMMDD: moment().format('YYYY-MM-DD')
  };
  expenseCopy: any;
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
  @ViewChild('appPrinter', { static: true }) appPrinter: PrinterComponent;
  
  private modalRef: MDBModalRef;


  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private idbService: NgxIndexedDBService,
    private expenseService: ExpensesService
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
    this.store.select(getUser).subscribe((user: any) => {
      this.user = user;
    });
    this.expenseService.newExpenseAdded.subscribe((receipt_number: string) => {
      if (receipt_number) {
        const expenseCopy = JSON.parse(JSON.stringify(this.expenseCopy));
        this.appPrinter.expense = {
          ...expenseCopy,
          added_by: this.user.displayName,
          expense_date: this.expenseDate.format('DD-MM-YYYY'),
          receipt_number
        };
        // this.appPrinter.triggerPrint();
        this.expenseCopy = null;
      }
    })
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
    this.expenseCopy = JSON.parse(JSON.stringify(this.expense));
    this.store.dispatch(new fromExpenses.ExpensesAddQuery(this.expense));
    
    this.idbService
      .getByKey('expenses', this.expenseCopy.item)
      .subscribe((data) => {
        if (!data) {
          this.idbService.add('expenses', {
            item: this.expenseCopy.item,
            frequency: 1
          }).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }));
        } else {
          this.idbService.update('expenses',
          {
            item: this.expenseCopy.item,
            frequency: (data as any).frequency + 1
          }, (data as any).key).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }))
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
    const self = this;
    this.expenseCopy = JSON.parse(JSON.stringify(this.salary));
    this.store.dispatch(new fromExpenses.ExpensesAddQuery(this.salary));
    this.idbService
      .getByKey('salary', this.expenseCopy.description)
      .subscribe((data) => {
        if (!data) {
          this.idbService.add('salary', {
            person: self.expenseCopy.description,
            amount: self.expenseCopy.cost,
            frequency: 1
          }).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }))
        } else {
          this.idbService.update('salary',
          {
            person: self.expenseCopy.description,
            amount: self.expenseCopy.cost,
            frequency: (data as any).frequency + 1
          }, (data as any).key).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }))
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

  editExpense(expense: Expenses) {
    this.modalRef = this.modalService.show(EditExpenseComponent, {
      ...this.modalConfig,
      data: {
        heading: 'Edit Expense',
        expense: expense
      }
    });

    this.modalRef.content.editedExpense.pipe(take(1)).subscribe( (expense: any) => {
      this.store.dispatch(new fromExpenses.ExpensesAddQuery(expense));
    });
  }
}
