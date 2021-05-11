import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Poojas } from 'src/app/poojas/models/poojas.model';
import { getPoojas } from 'src/app/poojas/store/poojas.selectors';
import { AppState } from 'src/app/reducers';
import * as fromPoojas from '../../store/poojas.actions';
import { getIsLoading } from 'src/app/poojas/store/poojas.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pooja-list',
  templateUrl: './pooja-list.component.html',
  styleUrls: ['./pooja-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoojaListComponent implements OnInit {
  @ViewChild('poojasForm', { static: true }) poojasForm: NgForm;

  poojas: Poojas[] = [];
  newPooja: any = {};
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.getPoojaList();
    this.isLoading$ = this.store.select(getIsLoading);
    this.initFormGroup();
  }
  
  initFormGroup() {
    this.newPooja = {};
    this.poojasForm && this.poojasForm.reset();
  }
  
  getPoojaList() {
    this.store.select(getPoojas).subscribe((poojas: Poojas[]) => {
      this.poojas = poojas;
      this.initFormGroup();
    })
    this.store.dispatch(new fromPoojas.PoojasQuery());

  }
  onAddPoojaType() {
    const req = this.newPooja;
    this.store.dispatch(new fromPoojas.PoojasAddQuery({ poojas: req }));
  }

  generateCode(str: string) {
    let code = '';
    str.split('').forEach((char: string, index: number) => {
      if (index % 2 === 0 && char !== ' ') {
        code += char;
      }
    });
    return `${code.slice(0, 5)}-${this.poojas.length + 1}`;
  }

}
