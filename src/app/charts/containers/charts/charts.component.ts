import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../../reducers/index';

import { Subscription } from 'rxjs';
import { ChartsService } from '../../services/charts.service';

var moment = require('../../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  isLoading$ = false;

  lineChartSub: Subscription;
  barChartSub: Subscription;

  dataset: DataSet[] = [{ data: [], label: ''}];
  chartLabels: any[] = [];

  barChartDataset: any[] = [{ data: [], label: '' }];
  barChartchartLabels: any[] = [];
  barChartDate: string;
  barChartBase: string;

  currency: string;

  pageData: {
    todaysData?: ChartConfig,
    thisWeeksData?: ChartConfig,
    thisMonthsData?: ChartConfig,
    thisYearsData?: ChartConfig,
  } = {};

  todaysDate = moment();
  thisWeekStartDate = this.todaysDate.clone().startOf('isoWeek');
  thisWeekEndDate = this.todaysDate.clone().endOf('isoWeek');
  thisMonthStartDate = this.todaysDate.clone().startOf('month').format('YYYY-MM-DD');
  thisMonthEndDate = this.todaysDate.clone().endOf('month').format('YYYY-MM-DD');
  thisYearStartDate = this.todaysDate.clone().startOf('year').format('YYYY-MM-DD');
  thisYearEndDate = this.todaysDate.clone().endOf('year').format('YYYY-MM-DD');

  constructor(private cs: ChartsService) { }

  ngOnInit() {
    this.isLoading$ = true;

    // this.lineChartSub = this.store.select(getLineChartData).subscribe( (data: any) => {
    //   if (data.values) {
    //     this.dataset = [{ data: data.values, label: `${data.currencyName} exchange rates (base EUR)`}];
    //     this.chartLabels = data.chartLabels;
    //   } else {
    //     this.getExchangeRates('USD');
    //   }
    // });

    // this.barChartSub = this.store.select(getBarChartData).subscribe( (data: any) => {
    //   if (data.values) {
    //     this.barChartDataset = [{ data: data.values, label: `${data.date} exchange rates (base ${data.base})`}];
    //     this.barChartchartLabels = data.chartLabels;
    //   } else {
    //     this.getLatestExchangeRates();
    //   }
    // });

    this.cs.getReconsiledBook({startDate: this.thisYearStartDate, endDate: this.thisYearEndDate})
    .subscribe((data: any) => {
      const todaysBook = data.book.find((book: any) => book.date === moment().format('YYYY-MM-DD'));
      // const monthBook = data.book.map((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(moment(), 'month'));
      // const yearBook = data.book.map((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(moment(), 'year'));
      // [
        this.pageData.todaysData = this.getTodaysData(todaysBook);
        this.pageData.thisWeeksData = this.getWeekData(data);
        this.pageData.thisMonthsData = this.getMonthData(data);
        // this.pageData.thisWeeksData = this.getTodaysData(weekBook); -- Week Data to continue tomorow
        // this.pageData.thisMonthsData,
        // this.pageData.thisYearsData,
      // ] = [
      //   this.getTodaysData(todaysBook)
    
      // ];
      this.isLoading$ = false;
    })
  }

  getMonthData(data: any) {
    const monthBook = data.book.filter((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(this.thisMonthStartDate, 'Month'));
    if(!monthBook) {
      return;
    }
    let book: any = {};
    monthBook.forEach((monthEl: any, index: number) => {
      if (monthEl) {
        if (index === 0) {
          book = {...monthEl}
        } else {
          book.poojas = book.poojas.concat(monthEl.poojas);
          book.expenses = book.expenses.concat(monthEl.expenses);
          book.donations = book.donations.concat(monthEl.donations);
        }
        // const profitLoss = monthEl.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0) -
        //   monthEl.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0) +
        //   monthEl.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0);
        // monthlyOverView.dataSet[0].data.push(profitLoss);
        // monthlyOverView.chartLabels.push(monthEl.date);
      }
    });
    return this.getReconsolidatedData(book);
  }

  getWeekData(data: any) {
    const weekBook = data.book.filter((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(this.thisWeekStartDate, 'isoWeek'));
    if(!weekBook) {
      return;
    }
    let book: any = {};
    let weeklyOverView: any = {
      dataSet: [{data: [], label: 'Profit/Loss Weekly Data'}],
      chartLabels: []
    };
    weekBook.forEach((weekEl: any, index: number) => {
      if (weekEl) {
        if (index === 0) {
          book = {...weekEl}
        } else {
          book.poojas = book.poojas.concat(weekEl.poojas);
          book.expenses = book.expenses.concat(weekEl.expenses);
          book.donations = book.donations.concat(weekEl.donations);
        }
        const profitLoss = weekEl.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0) -
          weekEl.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0) +
          weekEl.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0);
        weeklyOverView.dataSet[0].data.push(profitLoss);
        weeklyOverView.chartLabels.push(weekEl.date);
      }
    });
    return {...this.getReconsolidatedData(book), weeklyOverView};
  }

  getTodaysData(book: any) {
    if(!book) {
      return;
    }
    return this.getReconsolidatedData(book);
  }

  getReconsolidatedData(book: any) {

    const poojasList = Array.from(new Set(book.poojas.map((pooja: any) => pooja.pooja_name))); 
    const poojaData: any = [];
    poojasList.forEach((pooja: any) => {
      poojaData.push({
        pooja_name: pooja,
        totalAmount: 0,
        count: 0
      });
    });
    book.poojas.forEach((pooja: any) => {
      const item = poojaData.find((p: any) => p.pooja_name === pooja.pooja_name);
      if (item) {
        item.totalAmount += Number(pooja.pooja_price)
        item.count++;
      }
    });
    const reconsolidatedData = {
      currentOverView: {},
      overView: {
        dataSet: [ {
          data: [ book.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0),
          book.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0),
          book.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0) ],
          label: 'Balance Sheet'
        }],
        chartLabels: [`poojas (${book.poojas.length})`, `expenses (${book.expenses.length})`, `donations (${book.donations.length})`]
      },
      poojasOverView: {
        dataSet: [ {
          data: poojaData.map((pooja: any) => pooja.totalAmount),
          label: `Pooja Receivable`
        } ],
        chartLabels: poojaData.map((pooja: any) => `${pooja.pooja_name} (${pooja.count})`)
      }
    };
    reconsolidatedData.currentOverView = reconsolidatedData.overView;
    return reconsolidatedData;
  }

  // getExchangeRates(currency: string) {
  //   this.store.dispatch(new fromCharts.LineChartQuery({ currency }));
  // }

  // getLatestExchangeRates() {
  //   this.store.dispatch(new fromCharts.BarChartQuery());
  // }

  getProfitLoss(data: any) {
    if (data.overView.dataSet[0]) {
      const allTransactions = data.overView.dataSet[0].data;
      if (allTransactions) {
        return allTransactions[0] + allTransactions[2] - allTransactions[1]  // poojas + donations - expense
      }
    }
    return '';
  }

  swapPoojasData(obj: any) {
    obj.currentOverView = obj.currentOverView == obj.poojasOverView ? obj.overView : obj.poojasOverView;
  }

  ngOnDestroy() {
    if (this.lineChartSub) {
      this.lineChartSub.unsubscribe();
    }

    if (this.barChartSub) {
      this.barChartSub.unsubscribe();
    }
  }

}


interface DataSet {
  data: Array<any>,
  label: string
}

interface ChartConfig{
  overView: Chart,
  currentOverView: Chart | {},
  poojasOverView: Chart
  weeklyOverView?: Chart
}

interface Chart {
  dataSet: Array<DataSet>,
  chartLabels: Array<string>
}