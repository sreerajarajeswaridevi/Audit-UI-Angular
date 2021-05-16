import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './containers/admin/admin.component';

import * as fromAdmin from './store/admin.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { CollapseModule, CardsModule, ButtonsModule, BadgeModule, IconsModule, DropdownModule, TableModule, InputsModule, InputUtilitiesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { TempleListComponent } from './components/temple-list/temple-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, UserDetailComponent, TempleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    CollapseModule,
    CardsModule,
    DropdownModule,
    BadgeModule,
    ButtonsModule,
    IconsModule,
    TableModule,
    FormsModule,
    InputsModule,
    InputUtilitiesModule,
    StoreModule.forFeature('admin', fromAdmin.adminReducer),
    EffectsModule.forFeature([AdminEffects])
  ]
})
export class AdminModule { }
