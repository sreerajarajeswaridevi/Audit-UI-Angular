import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Expenses } from '../../models/expenses.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements AfterViewInit {

  editedExpense: Subject<any> = new Subject();
  @ViewChild('expenseForm', { static: true }) expenseForm: NgForm;

  @Input() expense: Expenses;
  @Input() heading: string;

  editedValue: any = {};

  constructor(public modalRef: MDBModalRef) { }

  ngAfterViewInit(): void {
    this.editedValue =  Object.assign({}, this.expense);
  }

  onSave() {
    const edited = {
      ...this.expense,
      ...this.editedValue,
      ist_YYYYMMDD: this.expense.expense_date
    };
    delete(edited.expense_date);
    this.editedExpense.next(edited);
    this.modalRef.hide();
  }

}
