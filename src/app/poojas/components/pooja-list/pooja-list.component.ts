import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PoojaTypes as Poojas } from 'src/app/poojas/models/poojas.model';
import { getPoojaTypes } from 'src/app/poojas/store/poojas.selectors';
import { AppState } from 'src/app/reducers';
import * as fromPoojas from '../../store/poojas.actions';
import { getIsLoading } from 'src/app/poojas/store/poojas.selectors';
import { Observable } from 'rxjs';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { take } from 'rxjs/operators';
import { isManager } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-pooja-list',
  templateUrl: './pooja-list.component.html',
  styleUrls: ['./pooja-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoojaListComponent implements OnInit {
  @ViewChild('poojasForm', { static: true }) poojasForm: NgForm;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  isManager$: Observable<boolean>;

  poojas: Poojas[] = [];
  newPooja: any = {};
  isLoading$: Observable<boolean>;
  editMode = false;
  editingIndex = -1;
  editCache: any = {};
  private modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered',
  };

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getPoojaList();
    this.isLoading$ = this.store.select(getIsLoading);
    this.isManager$ = this.store.select(isManager);
    this.initFormGroup();
  }
  
  initFormGroup() {
    this.newPooja = {};
    this.poojasForm && this.poojasForm.reset();
    if (this.editForm) {
      this.editForm.reset();
    }
    this.editMode = false;
  }
  
  getPoojaList() {
    this.store.select(getPoojaTypes).subscribe((poojas: Poojas[]) => {
      this.poojas = poojas;
      this.initFormGroup();
    })
    this.store.dispatch(new fromPoojas.PoojasTypeQuery());

  }

  onAddPoojaType() {
    const req = this.newPooja;
    this.store.dispatch(new fromPoojas.PoojaTypeAddQuery({ poojas: req }));
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

  openUserDeleteConfirmModal(pooja_code: string) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(new fromPoojas.PoojaTypeDeleted({ pooja_code: pooja_code }));
        }
      });
  }

  onDeletePooja(pooja_code: string) {
    this.openUserDeleteConfirmModal(pooja_code);
  }

  onSaveEdit() {
    const editingPooja = {
      ...this.editCache,
    };
    this.store.dispatch(new fromPoojas.PoojaTypeAddQuery({ poojas: editingPooja }));
    this.initFormGroup();
    this.editingIndex = -1;
  }

  onCancelEdit() {
    this.editCache = {};
    this.editingIndex = -1;
    this.initFormGroup();
  }

  edit(i: number) {
    this.editCache = JSON.parse(JSON.stringify(this.poojas[i]));
    this.editMode = true;
    this.editingIndex = i;
    setTimeout(() => {
      this.editForm.control.markAsTouched();
      this.editForm.control.markAsDirty();
      this.cdr.detectChanges();
    }, 0);
  }

}
