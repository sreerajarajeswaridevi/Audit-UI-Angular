import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import * as fromAdmin from '../../store/admin.actions';
import { getTemplesList, getTemplesListLoading,  } from '../../store/admin.selectors';
@Component({
  selector: 'app-temple-list',
  templateUrl: './temple-list.component.html',
  styleUrls: ['./temple-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TempleListComponent implements OnInit {
  temples: any = [];
  newTemple: FormGroup;
  loadingAddTemple = false;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    ) { 
   this.initFormGroup();
  }

  initFormGroup() {
    this.newTemple = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code:  new FormControl('', Validators.required),
      address:  new FormControl('', Validators.required),
    });   
    this.newTemple.reset();
  }

  ngOnInit() {
    this.getTempleList();
    this.isLoading$ = this.store.select(getTemplesListLoading);
  }

  getTempleList() {
    this.store.select(getTemplesList).subscribe((temples: any[]) => {
      this.temples = temples;
      this.initFormGroup();
    })
    this.store.dispatch(new fromAdmin.GetTemples());
  }


  onAddTemple() {
    this.store.dispatch(new fromAdmin.AddTemple({ temple: {
      "name": "morpheus",
      "job": "leader"
    }}));
  }

}
