import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule,
  ModalModule
} from 'angular-bootstrap-md';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { FormsModule } from '@angular/forms';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { PoojasModalComponent } from './components/poojas-modal/poojas-modal.component';
import { RightCardComponent } from './components/right-card/right-card.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    PoojasModalComponent,
    RightCardComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ModalModule,
    ButtonsModule,
    CardsModule
  ],
  exports: [CustomersListComponent, PoojasModalComponent, RightCardComponent, UserModalComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    PoojasModalComponent,
    UserModalComponent
  ]
})
export class SharedModule {}
