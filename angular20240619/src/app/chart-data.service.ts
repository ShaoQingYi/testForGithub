import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockData } from './mockData';
import { MoneyDetailEntity } from './MoneyDetailEntity';
import { HttpClient } from '@angular/common/http';
import { MoneyDetailsFromSpringboot } from './MoneyDetailsFromSpringboot';
import { serverUrl } from './serverUrl';
import { AppConstants } from './AppConstants';


@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private serviceUrl = serverUrl;

  generateColors(length: number): string[] {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getMoneyDetails(): Observable <MoneyDetailsFromSpringboot[]> {
    return this.httpClient.get<MoneyDetailsFromSpringboot[]>(this.serviceUrl + '/hayLwork/selectAllMoneyDetails');
  }

  // 指定日期（包含该日期）前7天数组
  get7DaysFrom(dateString: string, days: number): string[] {
    const date = new Date(dateString);
    const dateArray: string[] = [];

    for (let i = -days + 1; i <= 0; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(currentDate);
      dateArray.push(formattedDate);
    }

    return dateArray;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // 算出指定月份前12个月的月份数组
  get12MonthsFrom(dateString: string, months: number): string[] {
    const date = new Date(dateString);
    const monthArray: string[] = [];

    for (let i = 0; i < months; i++) {
      // const currentDate = new Date(date); //设置月末时有bug
      const currentDate = new Date(date.getFullYear(),date.getMonth(),1);
      currentDate.setMonth(date.getMonth() - i);
      const formattedDate = this.formatMonth(currentDate);
      monthArray.push(formattedDate);
    }

    return monthArray.reverse(); // 逆序排列
  }

  private formatMonth(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${year}-${month}`;
  }

  // 根据传入的日期数组，算出对应日期的花费累计
  calculateDailyCostsForJ(transactions: MoneyDetailEntity[], dateArray: string[]): number[] {
    return dateArray.map(date => {
      return transactions
        .filter(transaction => transaction.writeTime === date && transaction.inOrOut
          && transaction.payMethod == AppConstants.PAYMETHOD_J
        )
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // 根据传入的日期数组，算出对应日期的花费累计
  calculateDailyCostsForJCB(transactions: MoneyDetailEntity[], dateArray: string[]): number[] {
    return dateArray.map(date => {
      return transactions
        .filter(transaction => transaction.writeTime === date && transaction.inOrOut
          && transaction.payMethod == AppConstants.PAYMETHOD_JCB
        )
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // 根据传入的日期数组，算出对应日期的花费累计
  calculateDailyCostsForC(transactions: MoneyDetailEntity[], dateArray: string[]): number[] {
    return dateArray.map(date => {
      return transactions
        .filter(transaction => transaction.writeTime === date && transaction.inOrOut
          && 
          (transaction.payMethod != AppConstants.PAYMETHOD_J && transaction.payMethod != AppConstants.PAYMETHOD_JCB)
        )
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // 根据传入的日期数组，算出对应月份的花费累计
  calculateMonthlyCostsForJ(transactions: MoneyDetailEntity[], monthArray: string[]): number[] {
    return monthArray.map(month => {
      return transactions
        .filter(transaction => transaction.writeTime.startsWith(month) && transaction.inOrOut
        && transaction.payMethod == AppConstants.PAYMETHOD_J)
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // 根据传入的日期数组，算出对应月份的花费累计
  calculateMonthlyCostsForJCB(transactions: MoneyDetailEntity[], monthArray: string[]): number[] {
    return monthArray.map(month => {
      return transactions
        .filter(transaction => transaction.writeTime.startsWith(month) && transaction.inOrOut
        && transaction.payMethod == AppConstants.PAYMETHOD_JCB)
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // 根据传入的日期数组，算出对应月份的花费累计
  calculateMonthlyCostsForC(transactions: MoneyDetailEntity[], monthArray: string[]): number[] {
    return monthArray.map(month => {
      return transactions
        .filter(transaction => transaction.writeTime.startsWith(month) && transaction.inOrOut  && 
        (transaction.payMethod != AppConstants.PAYMETHOD_J && transaction.payMethod != AppConstants.PAYMETHOD_JCB))
        .reduce((sum, transaction) => sum + transaction.costMoney, 0);
    });
  }

  // calculateCategoryCosts(transactions: MoneyDetailEntity[], dateArray: string[]): { [key: string]: number } {
  //   const categoryCosts: { [key: string]: number } = {};

  //   dateArray.forEach(date => {
  //     transactions
  //       .filter(transaction => transaction.writeTime === date && !transaction.inOrOut)
  //       .forEach(transaction => {
  //         if (!categoryCosts[transaction.costType]) {
  //           categoryCosts[transaction.costType] = 0;
  //         }
  //         categoryCosts[transaction.costType] += transaction.costMoney;
  //       });
  //   });

  //   return categoryCosts;
  // }

  calculateCategoryCosts(transactions: MoneyDetailEntity[], startDate: string, endDate: string): { [key: string]: number } {
    const categoryCosts: { [key: string]: number } = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.writeTime);
        return transactionDate >= start && transactionDate <= end && transaction.inOrOut;
      })
      .forEach(transaction => {
        if (!categoryCosts[transaction.costType]) {
          categoryCosts[transaction.costType] = 0;
        }

        // 0620
        // 如果是国内支付方式的场合，支付金额*20
        if (transaction.payMethod != AppConstants.PAYMETHOD_J && 
          transaction.payMethod != AppConstants.PAYMETHOD_JCB) {
          categoryCosts[transaction.costType] += transaction.costMoney * 20;
        } else {
          categoryCosts[transaction.costType] += transaction.costMoney;
        }
        // 0620

        // categoryCosts[transaction.costType] += transaction.costMoney;
      });

    return categoryCosts;
  }
}
