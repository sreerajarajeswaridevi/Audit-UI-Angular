import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Donations } from '../models/donations.model';
import { of } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor() { }

  get userId() {
    return 'uid';
  }

  add(donations: Donations, userId: string) {
    return of([donations, userId]);

  }

  addDonations(donationss: Donations[]) {
    return of(donationss);

  }

  get(userId: string) {
    return of(userId);

  }

  update(donations: Donations, userId: string) {
    return of([donations, userId]);

  }

  delete(donations: Donations, userId: string) {
    return of([donations, userId]);

  }
}
