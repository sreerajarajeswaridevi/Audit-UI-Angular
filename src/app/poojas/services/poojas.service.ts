import { Injectable } from '@angular/core';
import { NewPoojaRequest, PoojaTypes } from '../models/poojas.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoojasService {

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
}
