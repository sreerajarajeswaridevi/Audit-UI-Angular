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
import { PwaComponent } from './components/pwa/pwa.component';
import { PwaService } from './services/pwa-service.service';
import { TranslateModule } from '@ngx-translate/core';
import { EditExpenseComponent } from '../expenses/containers/edit-expense/edit-expense.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
    PoojasModalComponent,
    EditExpenseComponent,
    RightCardComponent,
    UserModalComponent,
    UsersListComponent,
    UserComponent,
    TabsComponent,
    TabComponent,
    PrinterComponent,
    PwaComponent
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
    IndexedDBModule,
    TranslateModule
  ],
  exports: [
    CustomersListComponent,
    PoojasModalComponent,
    EditExpenseComponent,
    RightCardComponent,
    UserModalComponent,
    UsersListComponent,
    UserComponent,
    TabsComponent,
    TabComponent,
    PrinterComponent,
    PwaComponent,
    TranslateModule
  ],
  providers: [PwaService],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    PoojasModalComponent,
    EditExpenseComponent,
    UserModalComponent,
    PrinterComponent
  ]
})
export class SharedModule { }
