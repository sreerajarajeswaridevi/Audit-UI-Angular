import { Injectable } from '@angular/core';
import { Donations } from '../models/donations.model';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(private http: HttpClient) { }

  get userId() {
    return 'uid';
  }

  addDonations(expenses: Donations) {
    return this.http.post(
      `${environment.apiUrl}?api=addDonation`, { 
        ...expenses }
    );
  }

  get(request: any) {
    return this.http.get(
      `${environment.apiUrl}?api=listDonations`, 
      {
        params: {
        'ist_YYYYMMDD': request.payload
        }
      }
    );
  }

  update(expenses: Donations, userId: string) {
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
