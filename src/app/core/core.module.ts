import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

import {
  NavbarModule,
  DropdownModule,
  CardsModule,
  ButtonsModule,
  IconsModule
} from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from '../auth/auth.module';
import { SplitBodyComponent } from './split-body/split-body.component';
import { DatePickerDirective } from '../directives/date-picker.directive';
import { DateTransformDirective } from '../directives/date-transform.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ToFixedDirective } from '../directives/to-fixed.directive';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    RouterModule,
    DropdownModule.forRoot(),
    CardsModule,
    AuthModule,
    ButtonsModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    SplitBodyComponent,
    DatePickerDirective,
    DateTransformDirective,
    ToFixedDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    SplitBodyComponent,
    DatePickerDirective,
    DateTransformDirective,
    ToFixedDirective
  ]
})
export class CoreModule {}
