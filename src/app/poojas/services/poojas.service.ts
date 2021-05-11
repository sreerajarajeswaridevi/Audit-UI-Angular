import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Poojas } from '../models/poojas.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AngularFireAuth } from '@angular/fire/auth';

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

  addPoojas(poojas: Poojas[]) {
    return of(poojas);

  }

  getPoojaTypes() {
    return this.http.get(
      `${environment.apiUrl}?api=listPoojaTypes`
    );
  }

  update(poojas: Poojas, userId: string) {
    return of([poojas, userId]);

  }

  delete(poojas: Poojas, userId: string) {
    return of([poojas, userId]);

  }
}
