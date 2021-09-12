import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/auth/store/auth.selectors';
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
  @ViewChild('templeForm', { static: true }) templeForm: NgForm;

  temples: any = [];
  newTemple: any = {};
  loadingAddTemple = false;
  isLoading$: Observable<boolean>;
  isAdmin = false;
  selectedLogo = '';
  selectedIcon = '';
  base64Logo = '';
  base64Icon = '';


  constructor(
    private store: Store<AppState>,
    ) { 
  //  this.initFormGroup();
  }

  initFormGroup() {
    if (this.templeForm) {
      this.templeForm.reset();
      this.selectedIcon = '';
      this.selectedLogo = '';
      this.base64Icon = '';
      this.base64Logo = '';
    }
  }

  ngOnInit() {
    this.getTempleList();
    this.isLoading$ = this.store.select(getTemplesListLoading);
    this.store.select(getUser).subscribe((user: any) => {
      this.isAdmin = user.isAdmin;
      this.initFormGroup();
    })
  }

  getTempleList() {
    this.store.select(getTemplesList).subscribe((temples: any[]) => {
      this.temples = temples;
      this.initFormGroup();
    })
    this.store.dispatch(new fromAdmin.GetTemples());
  }


  onAddTemple() {
    const temple = {
      ...this.templeForm.value,
      logo: this.base64Logo,
      icon: this.base64Icon
    };
    this.store.dispatch(new fromAdmin.AddTemple({ temple: temple}));
    this.initFormGroup();
  }

  logoChanged(event: any) {
    this.selectedLogo = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.base64Logo = e.target.result;
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }

  iconChanged(event: any) {
    this.selectedIcon = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.base64Icon = e.target.result;
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }

}
