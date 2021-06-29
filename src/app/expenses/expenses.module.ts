import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './containers/expenses.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule, CardsModule, InputUtilitiesModule, BadgeModule } from 'angular-bootstrap-md';

import * as fromExpenses from './store/expenses.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './store/expenses.effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { IndexedDBModule } from './indexedDB/indexedDB.module';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputUtilitiesModule,
    InputsModule,
    IconsModule,
    TableModule,
    CoreModule,
    SharedModule,
    CardsModule,
    IndexedDBModule,
    BadgeModule,
    StoreModule.forFeature('expenses', fromExpenses.ExpensesReducer),
    EffectsModule.forFeature([ExpensesEffects])
  ],
  declarations: [ExpensesComponent],
  exports: [ExpensesComponent]
})
export class ExpensesModule { }
