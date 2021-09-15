import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('editForm', { static: true }) editForm: NgForm;

  temples: any = [];
  newTemple: any = {};
  loadingAddTemple = false;
  isLoading$: Observable<boolean>;
  isAdmin = false;
  selectedLogo = '';
  selectedIcon = '';
  base64Logo = '';
  base64Icon = '';
  
  editMode = false;
  editingIndex = -1;
  editCache: any = {};
  editedLogo = '';
  editedIcon = '';
  editedBase64Logo = '';
  editedBase64Icon = '';

  maxLogoSize = 250000;
  maxIconSize = 100000;


  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
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
    if (this.editForm) {
      this.editForm.reset();
      this.editedIcon = '';
      this.editedLogo = '';
      this.editedBase64Logo = '';
      this.editedBase64Icon = '';
    }
    this.editMode = false;
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
      icon: this.base64Icon,
      misc: {manthram: this.templeForm.value.misc}
    };
    this.store.dispatch(new fromAdmin.AddTemple({ temple: temple}));
    this.initFormGroup();
  }

  logoChanged(event: any) {
    if (event.target.files[0].size > this.maxLogoSize) {
      alert('file size too big. Limit is 250Kb');
      return;
    }
    this.selectedLogo = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.base64Logo = e.target.result;
      this.cdr.detectChanges();
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }
  
  iconChanged(event: any) {
    if (event.target.files[0].size > this.maxIconSize) {
      alert('file size too big. Limit is 100Kb');
      return;
    }
    this.selectedIcon = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.base64Icon = e.target.result;
      this.cdr.detectChanges();
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }
  
  logoEdited(event: any) {
    if (event.target.files[0].size > this.maxLogoSize) {
      alert('file size too big. Limit is 250Kb');
      return;
    }
    this.editedLogo = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.editedBase64Logo = e.target.result;
      this.cdr.detectChanges();
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }
  
  iconEdited(event: any) {
    if (event.target.files[0].size > this.maxIconSize) {
      alert('file size too big. Limit is 100Kb');
      return;
    }
    this.editedIcon = event.target.files[0].name;
    const FR= new FileReader();
    FR.addEventListener("load", (e: any) => {
      this.editedBase64Icon = e.target.result;
      this.cdr.detectChanges();
    }); 
    FR.readAsDataURL( event.target.files[0] );
  }

  onSaveEdit() {
    const editingTemple = {
      ...this.editCache,
      logo: this.editedBase64Logo || this.editCache.logo,
      icon: this.editedBase64Icon || this.editCache.logo,
    };
    this.store.dispatch(new fromAdmin.AddTemple({ temple: editingTemple}));
    this.initFormGroup();
    this.editingIndex = -1;
  }

  onCancelEdit() {
    this.editCache = {};
    this.editingIndex = -1;
    this.initFormGroup();
  }

  edit(i: number) {
    this.editCache = JSON.parse(JSON.stringify(this.temples[i]));
    this.editedBase64Icon = this.editCache.icon;
    this.editedBase64Logo = this.editCache.logo;
    this.editMode = true;
    this.editingIndex = i;
    setTimeout(() => {
      this.editForm.control.markAsTouched();
      this.editForm.control.markAsTouched();
      this.editForm.control.markAsDirty();
      this.editForm.control.markAsDirty();
      this.cdr.detectChanges();
    }, 0);
  }
}
