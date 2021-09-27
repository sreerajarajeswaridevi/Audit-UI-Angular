import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoojasRoutingModule } from './poojas-routing.module';
import { PoojasComponent } from './containers/poojas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule, CardsModule, DropdownModule, InputUtilitiesModule, BadgeModule } from 'angular-bootstrap-md';

import * as fromPoojas from './store/poojas.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PoojasEffects } from './store/poojas.effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PoojaListComponent } from './components/pooja-list/pooja-list.component';

@NgModule({
  imports: [
    CommonModule,
    PoojasRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    CoreModule,
    CardsModule,
    SharedModule,    
    DropdownModule,
    InputUtilitiesModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    StoreModule.forFeature('poojas', fromPoojas.PoojasReducer),
    EffectsModule.forFeature([PoojasEffects])
  ],
  declarations: [PoojasComponent, PoojaListComponent],
  exports: [PoojasComponent, PoojaListComponent]
})
export class PoojasModule { }
