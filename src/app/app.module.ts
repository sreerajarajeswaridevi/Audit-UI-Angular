import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ModalModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { APIInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    ModalModule.forRoot(),
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    CoreModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule {}
