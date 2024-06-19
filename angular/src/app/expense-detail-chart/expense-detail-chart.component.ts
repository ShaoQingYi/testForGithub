import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-expense-detail-chart',
  templateUrl: './expense-detail-chart.component.html',
  styleUrls: ['./expense-detail-chart.component.css']
})
export class ExpenseDetailChartComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    this.createChart();
    this.createChart2();
  }

  createChart() {
    const ctx = document.getElementById('detailChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Rent', 'Food', 'Transport', 'Utilities', 'Entertainment'],
        datasets: [
          {
            label: 'Expense Details',
            data: [1200, 500, 300, 200, 400],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
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

  createChart2() {
    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
        datasets: [
          {
            label: 'Daily Expenses',
            data: [
              { t: '2023-01-01', y: 30 },
              { t: '2023-01-02', y: 45 },
              { t: '2023-01-03', y: 28 },
              { t: '2023-01-04', y: 80 },
              { t: '2023-01-05', y: 99 }
            ],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day', // 'day', 'week', 'month', 'year' based on your requirement
              tooltipFormat: 'll',
              displayFormats: {
                day: 'MMM D',
                week: 'MMM D',
                month: 'MMM YYYY',
                year: 'YYYY'
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
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
}
