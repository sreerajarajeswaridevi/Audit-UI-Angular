import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule, ButtonsModule, InputsModule, IconsModule, InputUtilitiesModule, TableModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './containers/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { PoojasModule } from '../poojas/poojas.module';
import { SharedModule } from '../shared/shared.module';
import { AccountHeadComponent } from './components/account-head/account-head.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CardsModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    InputUtilitiesModule,
    TableModule,
    FormsModule,
    PoojasModule,
    IconsModule,
    SharedModule
  ],
  declarations: [ProfileComponent, MainProfileComponent, ProfileUserComponent, AccountHeadComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
