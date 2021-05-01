import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoojasRoutingModule } from './poojas-routing.module';
import { PoojasComponent } from './containers/poojas.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromPoojas from './store/poojas.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PoojasEffects } from './store/poojas.effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
    StoreModule.forFeature('poojas', fromPoojas.PoojasReducer),
    EffectsModule.forFeature([PoojasEffects])
  ],
  declarations: [PoojasComponent],
  exports: [PoojasComponent]
})
export class PoojasModule { }
