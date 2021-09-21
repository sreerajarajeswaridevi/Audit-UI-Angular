import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getIsLoading, getIsListLoading, getPoojaTypes, getPoojaList, getNewlyRegisteredPooja } from '../store/poojas.selectors';
import * as fromPoojas from '../store/poojas.actions';
import { GroupedPoojaList, NewPoojaRequest, PoojaList, PoojaTypes } from '../models/poojas.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';
import { take } from 'rxjs/operators';
import { PoojasService } from '../services/poojas.service';
import { isManager } from 'src/app/auth/store/auth.selectors';
import { PrinterComponent } from 'src/app/shared/components/printer/printer.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
// import { PoojasModalComponent } from 'src/app/shared/components/poojas-modal/poojas-modal.component';
var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-poojas',
  templateUrl: './poojas.component.html',
  styleUrls: ['./poojas.component.scss']
})
export class PoojasComponent implements OnInit {
  @ViewChild('appPrinter', { static: true }) appPrinter: PrinterComponent;

  isListLoading$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;

  poojaTypes: PoojaTypes[];
  
  poojaList: PoojaList[];
  tomorrowsPoojaList: PoojaList[];
  allPoojasList: PoojaList[];
  
  groupedPoojaList: Array<GroupedPoojaList> = [];
  groupedTomorrowsPoojaList: Array<GroupedPoojaList> = [];
  groupedAllPoojasList: Array<GroupedPoojaList> = [];
  
  allPoojasLoading = false;

  modalRef: MDBModalRef;
  newPoojaCacheHolder:any = null;

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
    // this.datePicked(moment());
    this.allPoojasList = [];
    this.poojaList = [];
    this.groupedPoojaList = [];
    this.groupedAllPoojasList = [];
    this.store.select(getPoojaTypes).subscribe((poojas: PoojaTypes[]) => {
      this.poojaTypes = poojas;
    })
    this.store.select(getPoojaList).subscribe((list: PoojaList[]) => {
      this.poojaList = list;
      this.groupedPoojaList = this.groupBy(list, 'receipt_number');
      this.poojasService.getPoojas(moment().add(1, 'days').format('YYYY-MM-DD'))
      .subscribe((poojas: { poojaList: PoojaList[] }) => {
        this.tomorrowsPoojaList = poojas.poojaList;
        this.groupedTomorrowsPoojaList = this.groupBy(poojas.poojaList, 'receipt_number');
      });
      if (list !== null) {
        this.datePicked(moment());
      }
    });
    this.store.select(getNewlyRegisteredPooja).subscribe((response: any) => {
      //response.receipt_number
      if (response != null && this.newPoojaCacheHolder) {
        let poojaDetails = this.newPoojaCacheHolder;
        const per_pooja_price = (+(poojaDetails.pooja_price)/poojaDetails.bhakthar.length).toFixed(2);
        this.appPrinter.poojas = this.newPoojaCacheHolder.bhakthar.map((person: any) => {
          return {
            ...person,
            ...poojaDetails,
            pooja_price: per_pooja_price,
            receipt_number: response.receipt_number,
            pooja_name: this.getPoojaNameFromCode(this.newPoojaCacheHolder.pooja_code)
          }
        });
        if (this.poojasService.$printClicked.value) {
          this.appPrinter.triggerPrint();
        }
        this.newPoojaCacheHolder = null;
      }
    })
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
      this.newPoojaCacheHolder = pooja;
      this.store.dispatch(new fromPoojas.RegisterPooja({ pooja: pooja }));
      this.datePicked(moment());
    });
  }

  onDeletePooja(pooja: PoojaList) {
    this.openUserDeleteConfirmModal(pooja);
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
      this.groupedAllPoojasList = this.groupBy(poojas.poojaList, 'receipt_number');
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

  groupBy = (items: Array<any>, key: string): any => 
  { 
    if (!items) {
      return [];
    }
    const grouped = items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }), 
      {},
    );
    const res =  [];
    for (let i in grouped) {
      res.push({
        receipt_number: i,
        poojas: grouped[i]
      });
    }
    return res;
  }

  openUserDeleteConfirmModal(pooja: PoojaList) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {this.poojasService.deletePooja(pooja).subscribe(() => {
          this.store.dispatch(new fromPoojas.PoojaListQuery(moment().format('YYYY-MM-DD'))); // todays poojas
          },
          () => {
            this.store.dispatch(new fromPoojas.PoojaListQuery(moment().format('YYYY-MM-DD'))); // todays poojas
          });
        }
      });
  }

  getTotalAmount(poojasList: Array<PoojaList>) {
    const sum = poojasList.reduce((acc: number, pooja: any) => {
      acc += pooja.poojas.reduce((sum: number, obj: any) => {
        sum += Number(obj.pooja_price);
        return sum;
      }, 0);
      return acc;
    }, 0);
    return sum;
  }

  getTotalReceiptAmount(pooja: any) {
    if (pooja && pooja.length > 0) {
      return pooja.reduce(((prev: any, current: any) => +(current.pooja_price) + prev), 0);
    }
    return '0';
  }
  
}
