import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Poojas } from 'src/app/poojas/models/poojas.model';
import { getPoojas } from 'src/app/poojas/store/poojas.selectors';
import { AppState } from 'src/app/reducers';
import * as fromPoojas from '../../../poojas/store/poojas.actions';
import { getIsLoading } from 'src/app/poojas/store/poojas.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pooja-list',
  templateUrl: './pooja-list.component.html',
  styleUrls: ['./pooja-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoojaListComponent implements OnInit {
  poojas: Poojas[] = [];
  newPooja: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    ) { 
   this.initFormGroup();
  }

  initFormGroup() {
    this.newPooja = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code:  new FormControl('', Validators.required),
      address:  new FormControl('', Validators.required),
    });   
    this.newPooja.reset();
  }

  ngOnInit() {
    this.getPoojaList();
    this.isLoading$ = this.store.select(getIsLoading);
  }

  getPoojaList() {
    this.store.select(getPoojas).subscribe((poojas: Poojas[]) => {
      this.poojas = poojas;
      this.initFormGroup();
    })
    this.store.dispatch(new fromPoojas.PoojasQuery());
    
  }


  onAddPooja() {

    this.store.dispatch(new fromPoojas.PoojasAddQuery({ poojas: {
      "name": "morpheus",
      "job": "leader"
    }}));
  }

}
