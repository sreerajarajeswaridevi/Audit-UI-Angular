import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationsComponent } from './containers/donations.component';

const routes: Routes = [{ path: '', component: DonationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationsRoutingModule { }
