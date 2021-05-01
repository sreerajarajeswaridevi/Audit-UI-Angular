import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Expenses } from '../models/expenses.model';
import { of } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor() { }

  get userId() {
    return 'uid';
  }

  add(expenses: Expenses, userId: string) {
    return of([expenses, userId]);

  }

  addExpenses(expensess: Expenses[]) {
    return of(expensess);

  }

  get(userId: string) {
    return of(userId);

  }

  update(expenses: Expenses, userId: string) {
    return of([expenses, userId]);

  }

  delete(expenses: Expenses, userId: string) {
    return of([expenses, userId]);

  }
}
