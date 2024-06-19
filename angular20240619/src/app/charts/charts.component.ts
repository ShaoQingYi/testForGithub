import { Component } from '@angular/core';
// import * as Chart from 'chart.js';
import { ChartType, ChartOptions,Chart } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

import { ChartDataService } from '../chart-data.service';
import { MoneyDetailEntity } from '../MoneyDetailEntity';
import { MoneyDetailsFromSpringboot } from '../MoneyDetailsFromSpringboot';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  constructor(private chartDataService: ChartDataService) { }

  async ngOnInit(): Promise<void> {
    
    this.getMoneyDetails();

    this.startDate = this.chartDataService.getTodayDate();

    this.startDateForPie = this.chartDataService.getTodayDate();
    this.endDateForPie = this.chartDataService.getTodayDate();

    // this.calculateTotalCostByDate();

    // this.lableDayForChart = this.chartDataService.get7DaysFrom('2024-06-19',6);
    // this.dataDayForChart = this.chartDataService.calculateDailyCosts(this.moneyDetails,this.lableDayForChart);
  
    // this.lableMonthForChart = this.chartDataService.get12MonthsFrom('2024-06-19',5);
    // this.dataMonthForChart = this.chartDataService.calculateMonthlyCosts(this.moneyDetails,this.lableMonthForChart);
  
    this.updateCategoryCosts();

    this.updateDailyCosts();
    this.updateMonthlyCosts();

    // this.createChart();
    // this.createChart2();
  }

  excludeDomesticTransfer: boolean = false;

  moneyDetails : MoneyDetailsFromSpringboot[] = [];
  moneyDetailsBk : MoneyDetailsFromSpringboot[] = [];
  totalCostByDate: { [key: string]: number } = {};
  
  chart: any;
  lableDetailForChartPie: any[] = [];
  // dataDetailForChartPie: any;

  lableDayForChart: any[] = [];
  dataDayForChart: number[] = [];

  lableMonthForChart: any[] = [];
  dataMonthForChart: number[] = [];

  startDate: string = '';
  dateRange: number = 7;
  monthRange: number = 12;

  startDateForPie: string= '';;
  endDateForPie: string= '';;

  categoryCosts: { [key: string]: number } = {};
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [{
    backgroundColor: this.chartDataService.generateColors(Object.values(this.categoryCosts).length),
  }];

  // public pieChartLabels: Label[] = [['Series A'], ['Series B']];
  // public pieChartData: SingleDataSet = [300, 500,600];
  // public pieChartType: ChartType = 'pie';

  onExcludeDomesticTransferChange() {
    if (this.excludeDomesticTransfer) {
      this.moneyDetails = this.moneyDetails.filter(detail => detail.costType !== '国内送金');
    } else{
      this.moneyDetails = this.moneyDetailsBk;
    }

    this.updateCategoryCosts();

    this.updateDailyCosts();
    this.updateMonthlyCosts();
  }

  // 取得每日花费详细
  getMoneyDetails(): void {
    // this.chartDataService.getMoneyDetails()
    //   .subscribe(moneyDetails => this.moneyDetails = moneyDetails);

    this.chartDataService.getMoneyDetails()
    .subscribe((MoneyDetails: any) =>  {
        this.moneyDetails = MoneyDetails;
        this.moneyDetailsBk = MoneyDetails;

        this.updateCategoryCosts();

        this.updateDailyCosts();
        this.updateMonthlyCosts();
      },
      error => {
        // this.error = error;
      });
  }

  // // 计算每天花费总和
  // calculateTotalCostByDate() {
  //   this.moneyDetails.forEach(transaction => {
  //     if (!transaction.inOrOut) { // 只计算出帐
  //       const date = transaction.writeTime;
  //       if (!this.totalCostByDate[date]) {
  //         this.totalCostByDate[date] = 0;
  //       }
  //       this.totalCostByDate[date] += transaction.costMoney;
  //     }
  //   });
  // }

  onDateRangeChangeForPie(){
    this.updateCategoryCosts();
  }

  onDateChange() {
    this.updateCategoryCosts();

    this.updateDailyCosts();
    this.updateMonthlyCosts();
    // this.createChart();
    // this.createChart2();
  }

  onDateRangeChange() {
    this.updateDailyCosts();
  }

  onMonthRangeChange() {
    this.updateMonthlyCosts();
  }

  // 每项详细占比
  updateCategoryCosts() {
    // this.lableDetailForChartPie = this.chartDataService.get7DaysFrom(this.startDate, this.dateRange);
    this.categoryCosts = this.chartDataService.calculateCategoryCosts(this.moneyDetails, this.startDateForPie,this.endDateForPie);
   
    // 背景色
    this.pieChartColors = [{
      backgroundColor: this.chartDataService.generateColors(Object.values(this.categoryCosts).length),
    }];
   
    this.updatePieChart();
  }
  
  // 更新指定日期内各项花销占比
  updatePieChart() {
    this.pieChartLabels = Object.keys(this.categoryCosts);
    this.pieChartData = Object.values(this.categoryCosts);
  }

  updateDailyCosts() {
    this.lableDayForChart = this.chartDataService.get7DaysFrom(this.startDate,this.dateRange);
    this.dataDayForChart = this.chartDataService.calculateDailyCosts(this.moneyDetails,this.lableDayForChart);
    this.createChart();
  }

  updateMonthlyCosts() {
    this.lableMonthForChart = this.chartDataService.get12MonthsFrom(this.startDate,this.monthRange);
    this.dataMonthForChart = this.chartDataService.calculateMonthlyCosts(this.moneyDetails,this.lableMonthForChart);
    this.createChart2();
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: this.lableDayForChart,
        datasets: [
          {
            label: '指定日期内每日花销合计',
            // data: [30, 45, 28, 80, 99, 43, 70],
            data: this.dataDayForChart,
            borderColor: this.chartDataService.generateColors(this.dataDayForChart.length),
            fill: false
          }
          // ,
          // {
          //   label: 'Monthly Expenses',
          //   data: [280, 480, 400, 190, 860, 270, 900],
          //   borderColor: 'rgba(54, 162, 235, 1)',
          //   fill: false
          // },
          // {
          //   label: 'Yearly Expenses',
          //   data: [2400, 4800, 3600, 1200, 7200, 1800, 9000],
          //   borderColor: 'rgba(255, 206, 86, 1)',
          //   fill: false
          // }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'category',
            scaleLabel: {
              display: true,
              labelString: 'Month'
            },
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Value'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createChart2() {
    const ctx = document.getElementById('detailChart2') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        // labels: ['Rent', 'Food', 'Transport', 'Utilities', 'Entertainment'],
        labels: this.lableMonthForChart,
        datasets: [
          {
            label: '12月内花销合计1',
            // data: [1200, 500, 300, 200, 400],
            data: this.dataMonthForChart,
            backgroundColor: this.chartDataService.generateColors(this.dataMonthForChart.length),
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)'
            // ],
            borderWidth: 1
          },
          {
            label: '12月内花销合计2',
            // data: [1200, 500, 300, 200, 400],
            data: this.dataMonthForChart,
            backgroundColor: this.chartDataService.generateColors(this.dataMonthForChart.length),
            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)'
            // ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)'
            // ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'category',
            scaleLabel: {
              display: true,
              labelString: 'Category'
            },
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
