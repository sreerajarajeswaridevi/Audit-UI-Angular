import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './containers/donations.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule, CardsModule, InputUtilitiesModule } from 'angular-bootstrap-md';

import * as fromDonations from './store/donations.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DonationsEffects } from './store/donations.effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DonationsRoutingModule,
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
    StoreModule.forFeature('donations', fromDonations.DonationsReducer),
    EffectsModule.forFeature([DonationsEffects])
  ],
  declarations: [DonationsComponent],
  exports: [DonationsComponent]
})
export class DonationsModule { }
