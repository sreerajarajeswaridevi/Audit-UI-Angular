import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable,  } from 'rxjs';
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
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-poojas',
  templateUrl: './poojas.component.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('100ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('100ms', style({ transform: 'translateY(100%)', opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./poojas.component.scss']
})
export class PoojasComponent implements OnInit {
  @ViewChild('appPrinter', { static: true }) appPrinter: PrinterComponent;
  
  searchControl: FormControl;
  isListLoading$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isManager$: Observable<boolean>;

  poojaTypes: PoojaTypes[];
  poojaTypeCache: PoojaTypes[];
  
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
  endDate = moment().add('180', 'days');
  selectedDate = moment();
  searchPlaceHolder = "Search Poojas";

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
    private poojasService: PoojasService,
    private idbService: NgxIndexedDBService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    // this.datePicked(moment());
    this.allPoojasList = [];
    this.poojaList = [];
    this.groupedPoojaList = [];
    this.groupedAllPoojasList = [];
    this.store.select(getPoojaTypes).subscribe((poojas: PoojaTypes[]) => {
      if (poojas && poojas.length > 0) {
        this.updatePoojaTypeOrder(poojas);
      }
    })
    this.store.select(getPoojaList).subscribe((list: PoojaList[]) => {
      this.poojaList = list;
      this.groupedPoojaList = this.groupBy(list, 'receipt_number');
      this.poojasService.getPoojas(moment().add(1, 'days').format('YYYY-MM-DD'))
      .subscribe((poojas: { poojaList: PoojaList[] }) => {
        this.tomorrowsPoojaList = poojas.poojaList;
        this.groupedTomorrowsPoojaList = this.groupBy(poojas.poojaList, 'receipt_number');
      });
      if (list === null) {
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
            pooja_date: this.newPoojaCacheHolder.ist_YYYYMMDD,
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
    this.searchPlaceHolder = this.translateService.instant('POOJAS.Search');
  }

  searchPoojaType(event: any) {
    const searchString = `${event.target.value}`.toLowerCase();
    if (searchString.length > 1) {
      this.poojaTypes = this.poojaTypeCache.filter((types: any) => 
        types.pooja_name.toLowerCase().includes(searchString) || 
        types.pooja_description.toLowerCase().includes(searchString) ||
        types.pooja_price.includes(searchString));
    } else {
      this.poojaTypes = this.poojaTypeCache;
    }
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
      this.pushPoojaTypeToIDB(pooja);
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

  pushPoojaTypeToIDB(pooja: any) {
    this.idbService
    .getByKey('poojaType', pooja.pooja_code)
    .subscribe((data) => {
      if (!data) {
        this.idbService.add('poojaType', {
          pooja_code: pooja.pooja_code,
          frequency: 1
        }).subscribe((added: any) => {
          console.log(added, 'added to idb');
          this.updatePoojaTypeOrder(this.poojaTypes);
        }, ((error: any) => {
          console.log(error);
        }));
      } else {
        this.idbService.update('poojaType',
        {
          pooja_code: pooja.pooja_code,
          frequency: (data as any).frequency + 1
        }, (data as any).key).subscribe((added: any) => {
          console.log(added, 'added to idb');
          this.updatePoojaTypeOrder(this.poojaTypes);
        }, ((error: any) => {
          console.log(error);
        }))
      }
    });
  }

  sortWithFrequentPoojaTypes(poojaTypes: PoojaTypes[]) {
    return new Promise((resolve: any, reject: any) => {
      this.idbService
      .getAll('poojaType')
      .subscribe((indexedType: any) => {
        if (indexedType && indexedType.length > 0) {
          const sortedIndexedType = indexedType.sort((a: any, b: any) => {
            if (a.frequency > b.frequency) {
              return -1;
            } else if (a.frequency > b.frequency){
              return 1;
            }
            return 0;
          });
          const indexObj = poojaTypes.reduce((acc: any, obj: any) => {
            acc[obj.pooja_code] = obj;
            return acc;
          }, {})
          const result = [];
          sortedIndexedType.forEach((indexedItem: any) => {
            if (indexObj[indexedItem.pooja_code]) {
              result.push(indexObj[indexedItem.pooja_code]);
              delete indexObj[indexedItem.pooja_code];
            }
          });
          for (const key in indexObj) {
            if(indexObj[key]) {
              result.push(indexObj[key]);
            }
          }
          resolve(result);
        }
        resolve(poojaTypes);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  updatePoojaTypeOrder(poojaTypes: PoojaTypes[]) {
    this.sortWithFrequentPoojaTypes(poojaTypes).then((sortedFreqPoojatypes: PoojaTypes[]) => {
      this.poojaTypes = sortedFreqPoojatypes;
      this.poojaTypeCache = sortedFreqPoojatypes;
    });
  }

}
