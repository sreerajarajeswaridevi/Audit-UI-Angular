import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { getUser } from '../auth/store/auth.selectors';
import { User } from '../auth/models/user.model';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class APIInterceptor implements HttpInterceptor {

    private user: User;
    
    constructor(private store: Store<AppState>) {
        this.store.select(getUser).subscribe((user: User) => {
            this.user = user;
        });
     }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        if (this.user && !req.url.includes('login') && !req.url.includes('i18n')) {
            const authReq = req.clone({
                url: `${req.url}&username=${this.user.username}&password=${this.user.password}`
              });
            return next.handle(authReq);
        }
    return next.handle(req);
  }
}