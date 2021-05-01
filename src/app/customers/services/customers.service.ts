import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Customer } from '../models/customer.model';
import { of } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  get userId() {
    return 'uid';
  }

  add(customer: Customer, userId: string) {
    return of([customer, userId]);

  }

  addCustomers(customers: Customer[]) {
    return of(customers);

  }

  get(userId: string) {
    return of(userId);

  }

  update(customer: Customer, userId: string) {
    return of([customer, userId]);

  }

  delete(customer: Customer, userId: string) {
    return of([customer, userId]);

  }
}
