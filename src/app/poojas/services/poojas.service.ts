import { Injectable } from '@angular/core';
import { NewPoojaRequest, PoojaList, PoojaTypes } from '../models/poojas.model';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoojasService {
  public $printClicked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  get userId() {
    return 'uid';
  }

  addPoojaType(newPooja: any) {
    return this.http.get(
      `${environment.apiUrl}?api=addPoojaType`,
      { 
        params: {
          ...newPooja
        }
      }
    );
  }

  addPooja(newPooja: NewPoojaRequest) {
    return this.http.post(
      `${environment.apiUrl}?api=addPooja`, { 
        ...newPooja }
    );
  }

  deletePooja(pooja: PoojaList) {
    return this.http.get(
      `${environment.apiUrl}?api=deletePooja`,
      { 
        params: {
          "uuid": pooja.uuid,
          "phone_number": pooja.phone_number
        }
      }
    );
  }

  getPoojaTypes() {
    return this.http.get(
      `${environment.apiUrl}?api=listPoojaTypes`
    );
  }

  getPoojas(date: string) {
    return this.http.get(
      `${environment.apiUrl}?api=listPoojas`, {
        params: {
          'ist_YYYYMMDD': date
        }
      }
    );
  }

  update(poojas: PoojaTypes, userId: string) {
    return of([poojas, userId]);

  }

  deletePoojaType(pooja_code: string) {
    return this.http.get(
      `${environment.apiUrl}?api=deletePoojaType`,
      { 
        params: {
          pooja_code: pooja_code
        }
      }
    );
  }

  getPersonsByPhoneNumber(phoneNumber: string) {
    return this.http.get(
      `${environment.apiUrl}?api=getPersonsByPhoneNumber`,
      { 
        params: {
          phone_number: phoneNumber
        }
      }
    );
  }
}
