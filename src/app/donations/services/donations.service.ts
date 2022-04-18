import { Injectable } from '@angular/core';
import { Donations } from '../models/donations.model';
import { of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  private $newDonationAdded = new Subject<string>();
  public newDonationAdded = this.$newDonationAdded.asObservable();
 
  constructor(private http: HttpClient) { }
  
  get userId() {
    return 'uid';
  }
  emitNewDonation(receipt_number: string) {
    this.$newDonationAdded.next(receipt_number);
  }

  addDonations(donations: Donations) {
    return this.http.post(
      `${environment.apiUrl}?api=addDonation`, { 
        ...donations }
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

  deleteDonation(uuId: string) {
    return this.http.post(
      `${environment.apiUrl}?api=deleteDonation`, { 
        'uuid': uuId   
      }
    );
  }
}
