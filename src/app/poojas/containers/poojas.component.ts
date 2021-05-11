import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading, getPoojas } from '../store/poojas.selectors';
import * as fromPoojas from '../store/poojas.actions';
import { Poojas } from '../models/poojas.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';
import { take } from 'rxjs/operators';
// import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';

@Component({
  selector: 'app-poojas',
  templateUrl: './poojas.component.html',
  styleUrls: ['./poojas.component.scss']
})
export class PoojasComponent implements OnInit {


  isLoading$: Observable<boolean>;
  poojas: Poojas[];

  modalRef: MDBModalRef;

  dates: {
    today: string,
    tomorrow: string
  }

  // modalConfig = {
  //   // backdrop: true,
  //   // keyboard: true,/
  //   // show: false,
  //   // ignoreBackdropClick: false,
  //   // containerClass: 'top',
  //   animated: true,
  //   data: {
  //     heading: 'New Pooja'
  //   }
  // };

  modalConfig = {
    containerClass: 'center',
    class: 'modal-dialog-centered center modal-lg',
    animated: true,
  };

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.dates = {
      today: new Date().toLocaleDateString(),
      tomorrow: date.toLocaleDateString()
    }
  }

  ngOnInit(): void {
    this.store.select(getPoojas).subscribe((poojas: Poojas[]) => {
      this.poojas = poojas;
    })
    this.isLoading$ = this.store.select(getIsLoading);
    this.store.dispatch(new fromPoojas.PoojasQuery());
  }

  newPooja(pooja: Poojas) {
    this.modalRef = this.modalService.show(PoojasModalComponent, {
      ...this.modalConfig,
      data: {
        heading: pooja.pooja_name,
        price: pooja.pooja_price
      }
    });

    this.modalRef.content.poojasData.pipe(take(1)).subscribe( (pooja: Poojas) => {
      this.store.dispatch(new fromPoojas.RegisterPooja({ poojas: pooja }));
    });
  }
}
