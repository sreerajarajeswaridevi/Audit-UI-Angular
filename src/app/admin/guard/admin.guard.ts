import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
// import { AdminService } from '../services/admin.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { take, switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.checkUserRole()
    .pipe(
      map( (isAdmin) => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      }),
      catchError( () => {
        this.router.navigateByUrl('');
        return of(false);
      })
    );
  }
}
