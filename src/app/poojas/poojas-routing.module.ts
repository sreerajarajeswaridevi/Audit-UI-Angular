import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoojasComponent } from './containers/poojas.component';

const routes: Routes = [{ path: '', component: PoojasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoojasRoutingModule { }
