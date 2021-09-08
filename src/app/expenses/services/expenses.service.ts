import { Injectable } from '@angular/core';
import { Expenses } from '../models/expenses.model';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private $newExpenseAdded = new Subject<string>();
  public newExpenseAdded = this.$newExpenseAdded.asObservable();
 
  constructor(private http: HttpClient) { }

  get userId() {
    return 'uid';
  }

  emitNewExpense(receipt_number: string) {
    this.$newExpenseAdded.next(receipt_number);
  }

  addExpenses(expenses: Expenses) {
    return this.http.post(
      `${environment.apiUrl}?api=addExpense`, { 
        ...expenses }
    );
  }

  get(request: any) {
    return this.http.get(
      `${environment.apiUrl}?api=listExpenses`, 
      {
        params: {
        'ist_YYYYMMDD': request.payload
        }
      }
    );
  }

  update(expenses: Expenses, userId: string) {
    return of([expenses, userId]);

  }

  deleteExpense(uuId: string) {
    return this.http.post(
      `${environment.apiUrl}?api=deleteExpense`, { 
        'uuid': uuId   
      }
    );
  }
}
