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
  activeTab = 'day';
  isLoading$ = false;

  lineChartSub: Subscription;
  barChartSub: Subscription;

  dataset: DataSet[] = [{ data: [], label: ''}];
  chartLabels: any[] = [];

  barChartDataset: any[] = [{ data: [], label: '' }];
  barChartchartLabels: any[] = [];
  barChartDate: string;
  barChartBase: string;
  response: any;
  rangeText = '';

  currency: string;

  pageData: {
    todaysData?: ChartConfig,
    thisWeeksData?: ChartConfig,
    thisMonthsData?: ChartConfig,
    thisYearsData?: ChartConfig,
    customData?: ChartConfig,
  } | any = {
    todaysData: {},
    thisWeeksData: {},
    thisMonthsData: {},
    thisYearsData: {},
    customData: {},
  };

  todaysDate = moment();
  weekDate = moment();
  monthDate = moment();
  yearDate = moment();
  customStartDate = moment();
  customEndDate = moment();
  datePickerStartDate = moment().subtract(3, 'year');

  thisWeekStartDate = moment();
  thisWeekEndDate = moment();
  thisMonthStartDate = moment();
  thisMonthEndDate = moment();
  thisYearStartDate = moment();
  thisYearEndDate = moment();
 
  constructor(private cs: ChartsService) {
    this.initDates();
   }

  initDates() {
    this.todaysDate = moment();
    this.weekDate = moment();
    this.monthDate = moment();
    this.yearDate = moment();
    this.customStartDate = moment();
    this.customEndDate = moment();

    this.thisWeekStartDate = this.todaysDate.clone().startOf('isoWeek');
    this.thisWeekEndDate = this.todaysDate.clone().endOf('isoWeek');
    this.thisMonthStartDate = this.todaysDate.clone().startOf('month');
    this.thisMonthEndDate = this.todaysDate.clone().endOf('month');
    this.thisYearStartDate = this.todaysDate.clone().startOf('year');
    this.thisYearEndDate = this.todaysDate.clone().endOf('year');  
    this.customStartDate = moment();
    this.customEndDate = moment();
  }

  initTab(tabName: string) {
    this.initDates();
    this.activeTab = tabName;
    switch(tabName) {
      case 'day': 
        this.getData(this.todaysDate, this.todaysDate, this.getTodaysData);
        this.rangeText = `${this.todaysDate.format('dddd DD-MM-YYYY')}`;
        break;
        case 'week': 
        this.getData(this.thisWeekStartDate, this.thisWeekEndDate, this.getWeekData);
        this.rangeText = `1 Week = ${this.thisWeekStartDate.format('DD-MM-YYYY')} To ${this.thisWeekEndDate.format('DD-MM-YYYY')}`;
        break;
        case 'month': 
        this.getData(this.thisMonthStartDate, this.thisMonthEndDate, this.getMonthData);
        this.rangeText = `1 Month = ${this.thisMonthStartDate.format('DD-MM-YYYY')} To ${this.thisMonthEndDate.format('DD-MM-YYYY')}`;
        break;
        case 'year': 
        this.getData(this.thisYearStartDate, this.thisYearEndDate, this.getYearlyData);
        this.rangeText = `1 Year = ${this.thisYearStartDate.format('DD-MM-YYYY')} To ${this.thisYearEndDate.format('DD-MM-YYYY')}`;
        break;
        case 'custom': 
        this.getData(this.todaysDate, this.todaysDate, this.getYearlyData);
        this.rangeText = `${this.todaysDate.format('dddd DD-MM-YYYY')}`;
        break;
    }
  }

  yesterday() {
    this.todaysDate = this.todaysDate.subtract(1, 'day');
    this.getData(this.todaysDate, this.todaysDate, this.getTodaysData);
  }

  tomorrow() {
    this.todaysDate = this.todaysDate.add(1, 'day');
    this.getData(this.todaysDate, this.todaysDate, this.getTodaysData);
  }

  prevWeek() {
    this.weekDate = this.weekDate.subtract(1, 'week');
    this.thisWeekStartDate = this.weekDate.clone().startOf('isoWeek');
    this.thisWeekEndDate = this.weekDate.clone().endOf('isoWeek');
    this.getData(this.thisWeekStartDate, this.thisWeekEndDate, this.getWeekData);
  }

  nextWeek() {
    this.weekDate = this.weekDate.add(1, 'week');
    this.thisWeekStartDate = this.weekDate.clone().startOf('isoWeek');
    this.thisWeekEndDate = this.weekDate.clone().endOf('isoWeek');
    this.getData(this.thisWeekStartDate, this.thisWeekEndDate, this.getWeekData);
  }

  prevMonth() {
    this.monthDate = this.monthDate.subtract(1, 'month');
    this.thisMonthStartDate = this.monthDate.clone().startOf('month');
    this.thisMonthEndDate = this.monthDate.clone().endOf('month');
    this.getData(this.thisMonthStartDate, this.thisMonthEndDate, this.getMonthData);
  }

  nextMonth() {
    this.monthDate = this.monthDate.add(1, 'month');
    this.thisMonthStartDate = this.monthDate.clone().startOf('month');
    this.thisMonthEndDate = this.monthDate.clone().endOf('month');
    this.getData(this.thisMonthStartDate, this.thisMonthEndDate, this.getMonthData);
  }

  prevYear() {
    this.yearDate = this.yearDate.subtract(1, 'year');
    this.thisYearStartDate = this.yearDate.clone().startOf('year');
    this.thisYearEndDate = this.yearDate.clone().endOf('year');
    this.getData(this.thisYearStartDate, this.thisYearEndDate, this.getYearlyData);
  }

  nextYear() {
    this.yearDate = this.yearDate.add(1, 'year');
    this.thisYearStartDate = this.yearDate.clone().startOf('year');
    this.thisYearEndDate = this.yearDate.clone().endOf('year');
    this.getData(this.thisYearStartDate, this.thisYearEndDate, this.getYearlyData);
  }

  getCustomData() {
    const startDate = this.customStartDate.clone();
    const endDate = this.customEndDate.clone();
    this.getData(startDate, endDate, this.getRangeData);
  }

  ngOnInit() {
    
    this.getData(this.todaysDate, this.todaysDate, this.getTodaysData);
    // this.cs.getReconsiledBook({startDate: this.thisYearStartDate, endDate: this.thisYearEndDate})
    // .subscribe((data: any) => {
    //   const todaysBook = data.book.find((book: any) => book.date === moment().format('YYYY-MM-DD'));
    //   // const monthBook = data.book.map((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(moment(), 'month'));
    //   // const yearBook = data.book.map((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(moment(), 'year'));
    //   // [
    //     this.pageData.todaysData = this.getTodaysData(todaysBook);
    //     this.pageData.thisWeeksData = this.getWeekData(data);
    //     this.pageData.thisMonthsData = this.getMonthData(data);
    //     this.pageData.thisYearsData = this.getYearlyData(data);
    //     // this.pageData.thisWeeksData = this.getTodaysData(weekBook); -- Week Data to continue tomorow
    //     // this.pageData.thisMonthsData,
    //     // this.pageData.thisYearsData,
    //   // ] = [
    //   //   this.getTodaysData(todaysBook)
    
    //   // ];
    //   this.isLoading$ = false;
    // })
  }

  recalc() {
    this.cs.recalc().subscribe(() => {
      this.initDates();
      this.getData(this.todaysDate, this.todaysDate, this.getTodaysData);
    });
  }
  

  getData(startDate: any, endDate: any, method: any) {
    this.rangeText = `${startDate.format('DD-MM-YYYY')} To ${endDate.format('DD-MM-YYYY')}`;
    this.isLoading$ = true;
    this.cs.getReconsiledBook({startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')})
    .subscribe((data: any) => {
    this.response = data.book;
     method(data);
      this.isLoading$ = false;
    })
  }

  getYearlyData = (data: any) => {
    const yearBook = data.book;
    if(!yearBook) {
      return;
    }
    let book: any = new Book();
    let yearlyOverView: any = {
      dataSet: [{data: moment.months().map(() => 0), label: 'Yearly Profit/Loss Data'}],
      chartLabels: moment.months()
    };
    yearBook.forEach((monthEl: any, index: number) => {
      if (monthEl) {
        if (index === 0) {
          book = {...monthEl}
        } else {
          book.poojas = book.poojas.concat(monthEl.poojas);
          book.expenses = book.expenses.concat(monthEl.expenses);
          book.donations = book.donations.concat(monthEl.donations);
        }
        const indexOfMonth = moment.months().indexOf(moment(monthEl.date).format('MMMM'));
        const profitLoss = monthEl.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0) -
          monthEl.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0) +
          monthEl.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0);
        yearlyOverView.dataSet[0].data[indexOfMonth] += profitLoss;
      }
    });
    this.pageData.thisYearsData = {...this.getReconsolidatedData(book), yearlyOverView};
  }

  getRangeData = (data: any) => {
    const yearBook = data.book;
    if(!yearBook) {
      return;
    }
    let book: any = new Book();
    let yearlyOverView: any = {
      dataSet: [{data: [], label: 'Profit/Loss Data'}],
      chartLabels: []
    };
    yearBook.forEach((monthEl: any, index: number) => {
      if (monthEl) {
        if (index === 0) {
          book = {...monthEl}
        } else {
          book.poojas = book.poojas.concat(monthEl.poojas);
          book.expenses = book.expenses.concat(monthEl.expenses);
          book.donations = book.donations.concat(monthEl.donations);
        }
        const profitLoss = monthEl.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0) -
          monthEl.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0) +
          monthEl.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0);
        yearlyOverView.dataSet[0].data.push(profitLoss);
        yearlyOverView.chartLabels.push(monthEl.date);
      }
    });
    this.pageData.thisYearsData = {...this.getReconsolidatedData(book), yearlyOverView};
  }

  getMonthData = (data: any) => {
    const monthBook = data.book;
    if(!monthBook) {
      return;
    }
    let book: any = new Book();
    let monthlyOverView: any = {
      dataSet: [{data: [], label: 'Profit/Loss Monthly Data'}],
      chartLabels: []
    };
    let weekRange: any = [];
    if (monthBook[0] && monthBook[0].date) {
      weekRange = this.getWeekRange(monthBook[0].date);
      monthlyOverView.chartLabels = weekRange.map((item: any, index: number) => {
        item = item;
        return 'Week ' + (index+1)
      });
    }
    monthlyOverView.dataSet[0].data = monthlyOverView.chartLabels.map(() => 0);
    monthBook.forEach((monthEl: any, index: number) => {
      if (monthEl) {
        if (index === 0) {
          book = {...monthEl}
        } else {
          book.poojas = book.poojas.concat(monthEl.poojas);
          book.expenses = book.expenses.concat(monthEl.expenses);
          book.donations = book.donations.concat(monthEl.donations);
        }
        const profitLoss = monthEl.poojas.reduce((total: number, item: any) => Number(total) + Number(item.pooja_price), 0) -
          monthEl.expenses.reduce((total: number, item: any) => Number(total) + Number(item.cost), 0) +
          monthEl.donations.reduce((total: number, item: any) => Number(total) + Number(item.amount), 0);
        
          // monthlyOverView.dataSet[0].data.push(profitLoss);

          weekRange.forEach((element: any, index: number) => {
            if(moment(monthEl.date).isSame(element[0], 'isoWeek')) {
              monthlyOverView.dataSet[0].data[index] += profitLoss;
              return;
            }
          });
      }
    });
    this.pageData.thisMonthsData = {...this.getReconsolidatedData(book), monthlyOverView};
  }

  getWeekData = (data: any) => {
    // const weekBook = data.book.filter((book: any) => moment(book.date, 'YYYY-MM-DD').isSame(this.thisWeekStartDate, 'isoWeek'));
    const weekBook = data.book;
    if(!weekBook) {
      return;
    }
    let book: any = new Book();
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
    this.pageData.thisWeeksData = {...this.getReconsolidatedData(book), weeklyOverView};
  }

  getTodaysData = (response: any) => {
    if(!response.book[0]) {
      this.pageData.todaysData = this.getReconsolidatedData(new Book());
      return;
    }
    this.pageData.todaysData = this.getReconsolidatedData(response.book[0]);
  }

  getReconsolidatedData = (book: any) => {

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
          label: 'Total Amount'
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

  selectCustomStartDate(event: any) {
    this.customStartDate = event;
  }

  selectCustomEndDate(event: any) {
    this.customStartDate = event;
  }

  getWeekRange(date: string) {
    const month = moment(date, 'YYYY-MM-DD');
    
    const mm = month.month() + 1;
    const yy = month.year();


    const first = month.day() == 0 ? 6 : month.day()-1;
    let day = 7-first;

    const last = month.daysInMonth();
    const count = (last-day)/7;

    const weeks = [];
    weeks.push([moment(`${(1)}-${mm}-${yy}`, 'DD-MM-YYYY').format('YYYY-MM-DD'), moment(`${(day)}-${mm}-${yy}`, 'DD-MM-YYYY').format('YYYY-MM-DD')]);
    for (let i=0; i < count; i++) {
      weeks.push([moment(`${(day+1)}-${mm}-${yy}`, 'DD-MM-YYYY').format('YYYY-MM-DD'), moment(`${(Math.min(day+=7, last))}-${mm}-${yy}`, 'DD-MM-YYYY').format('YYYY-MM-DD')]);

    }
    return weeks;
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
  monthlyOverView?: Chart
}

interface Chart {
  dataSet: Array<DataSet>,
  chartLabels: Array<string>
}

class Book {
  poojas = [];
  expenses = [];
  donations = [];
}