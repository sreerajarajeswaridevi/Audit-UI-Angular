import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading, getIsListLoading, getPoojaTypes, getPoojaList } from '../store/poojas.selectors';
import * as fromPoojas from '../store/poojas.actions';
import { NewPoojaRequest, PoojaList, PoojaTypes } from '../models/poojas.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';
import { take } from 'rxjs/operators';
import { PoojasService } from '../services/poojas.service';
import { isManager } from 'src/app/auth/store/auth.selectors';
// import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';
var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-poojas',
  templateUrl: './poojas.component.html',
  styleUrls: ['./poojas.component.scss']
})
export class PoojasComponent implements OnInit {


  isListLoading$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;

  poojaTypes: PoojaTypes[];
  poojaList: PoojaList[];
  tomorrowsPoojaList: PoojaList[];
  allPoojasList: PoojaList[];
  allPoojasLoading = false;

  modalRef: MDBModalRef;

  defaultDate = moment();
  startDate = moment().subtract(60, 'days');
  endDate = moment().add('30', 'days');
  selectedDate = moment();

  dates = {
    today: moment().format('DD-MM-YYYY'),
    tomorrow: moment().add(1, 'days').format('DD-MM-YYYY')
  };

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
    private modalService: MDBModalService,
    private poojasService: PoojasService
  ) {

  }

  ngOnInit(): void {
    this.datePicked(moment());
    this.store.select(getPoojaTypes).subscribe((poojas: PoojaTypes[]) => {
      this.poojaTypes = poojas;
    })
    this.store.select(getPoojaList).subscribe((list: PoojaList[]) => {
      this.poojaList = list;
      this.poojasService.getPoojas(moment().add(1, 'days').format('YYYY-MM-DD'))
      .subscribe((poojas: { poojaList: PoojaList[] }) => {
        this.tomorrowsPoojaList = poojas.poojaList;
      });
      this.datePicked(moment());
    });
    this.isManager$ = this.store.select(isManager);
    this.isLoading$ = this.store.select(getIsLoading);
    this.isListLoading$ = this.store.select(getIsListLoading);
    this.store.dispatch(new fromPoojas.PoojasTypeQuery());
    this.store.dispatch(new fromPoojas.PoojaListQuery(moment().format('YYYY-MM-DD'))); // todays poojas
  }

  newPooja(pooja: PoojaTypes) {
    this.modalRef = this.modalService.show(PoojasModalComponent, {
      ...this.modalConfig,
      data: {
        heading: pooja.pooja_name,
        price: pooja.pooja_price,
        code: pooja.pooja_code
      }
    });

    this.modalRef.content.poojasData.pipe(take(1)).subscribe( (pooja: NewPoojaRequest) => {
      this.store.dispatch(new fromPoojas.RegisterPooja({ pooja: pooja }));
      this.datePicked(moment());
    });
  }

  getPoojaNameFromCode(pooja_code: string) {
    const res = this.poojaTypes && this.poojaTypes.find(pooja => pooja.pooja_code === pooja_code);
    if (res) {
      return res.pooja_name;
    }
    return '';
  }


  datePicked(date: any) {
    this.selectedDate = date;
    this.allPoojasLoading = true;
    this.poojasService.getPoojas(date.format('YYYY-MM-DD'))
    .subscribe((poojas: { poojaList: PoojaList[] }) => {
      this.allPoojasList = poojas.poojaList;
      this.allPoojasLoading = false;
    }).add(() => {
      this.allPoojasLoading = false;
    })
  }

  prevDate() {
    this.datePicked(this.selectedDate.subtract('1', 'days'));
  }

  nextDate() {
    this.datePicked(this.selectedDate.add('1', 'days'));
  }
}
