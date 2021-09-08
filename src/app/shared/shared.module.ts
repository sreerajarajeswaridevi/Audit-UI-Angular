import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule,
  ModalModule,
  TableModule,
  CollapseModule,
  DropdownModule,
  BadgeModule
} from 'angular-bootstrap-md';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { FormsModule } from '@angular/forms';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { PoojasModalComponent } from './components/poojas-modal/poojas-modal.component';
import { RightCardComponent } from './components/right-card/right-card.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { CoreModule } from '../core/core.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab.component';
import { PrinterComponent } from './components/printer/printer.component';
import { IndexedDBModule } from '../expenses/indexedDB/indexedDB.module';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    PoojasModalComponent,
    RightCardComponent,
    UserModalComponent,
    UsersListComponent,
    UserComponent,
    TabsComponent,
    TabComponent,
    PrinterComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    TableModule,
    FormsModule,
    ModalModule,
    ButtonsModule,
    CardsModule,
    CollapseModule,
    DropdownModule,
    BadgeModule,
    CoreModule,
    IndexedDBModule
  ],
  exports: [
    CustomersListComponent,
    PoojasModalComponent,
    RightCardComponent,
    UserModalComponent,
    UsersListComponent,
    UserComponent,
    TabsComponent,
    TabComponent,
    PrinterComponent
  ],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    PoojasModalComponent,
    UserModalComponent,
    PrinterComponent
  ]
})
export class SharedModule { }
