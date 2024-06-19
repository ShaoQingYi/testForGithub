import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { costType } from './costType';
import { costTypes } from './mock-costType';
import { payMethod } from './payMethod';
import { payMethods } from './mock-payMethod';
import { incomeType } from './incomeType';
import { incomeTypes } from './mock-incomeType';
import { MoneyDetailEntity } from './MoneyDetailEntity';
import { MoneyDetailsFromSpringboot } from './MoneyDetailsFromSpringboot';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverUrl } from './serverUrl';

@Injectable({
  providedIn: 'root'
})
export class MoneyDetailService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Custom-Header': 'expected-header-value' })
  // };

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private httpClient: HttpClient
  ) { }

  // TODO SpringBoot
  private serviceUrl = serverUrl;
  // private serviceUrl = 'http://5c0w777458.qicp.vip';
  

  getToday(): string {
    return formatDate(new Date(), 'yyyy-MM-dd',this.locale);
  }

  getMinDate(): string {
    return formatDate(new Date("2024/04/01"), 'yyyy-MM-dd',this.locale);
  }

  getCostTypes(): Observable <costType[]> {
    // const costtypes = of(costTypes);
    // return costtypes;
    return this.httpClient.get<costType[]>(this.serviceUrl + '/hayLwork/selectCostTypes');
  }

  getPayMethods(): Observable <payMethod[]> {
    // const paymethods = of(payMethods);
    // return paymethods;
    return this.httpClient.get<payMethod[]>(this.serviceUrl + '/hayLwork/selectPayMethods');
  }

  getIncomeTypes(): Observable <incomeType[]> {
    // const incometypes = of(incomeTypes);
    // return incometypes;
    return this.httpClient.get<incomeType[]>(this.serviceUrl + '/hayLwork/selectIncomeTypes');
  } 

  getAllMoneyDetails(): Observable <MoneyDetailsFromSpringboot[]> {
    // const costtypes = of(costTypes);
    // return costtypes;
    return this.httpClient.get<MoneyDetailsFromSpringboot[]>(this.serviceUrl + '/hayLwork/selectAllMoneyDetails');
  }

  insertMoneyDetail(moneyDetailEntity: MoneyDetailEntity) {
    return this.httpClient.post(this.serviceUrl + '/hayLwork/insertMoneyDetail', moneyDetailEntity);
  }

  getMoneyDetailbyId(id:number): Observable <MoneyDetailsFromSpringboot> {
    // const costtypes = of(costTypes);
    // return costtypes;
    return this.httpClient.get<MoneyDetailsFromSpringboot>(this.serviceUrl + '/hayLwork/selectMoneyDetailById/?id=' + id);
  }

  updateMoneyDetailById(id:number, moneyDetailEntity: MoneyDetailEntity) {
    return this.httpClient.post(this.serviceUrl + '/hayLwork/updateMoneyDetail/?id=' + id, moneyDetailEntity);
  }

  deleteMoneyDetailById(id:number, moneyDetailEntity: MoneyDetailEntity) {
    return this.httpClient.post(this.serviceUrl + '/hayLwork/deleteMoneyDetail/?id=' + id, moneyDetailEntity);
  }

  excelBatchBydate(frontDate:string): Observable <String> {
    // const costtypes = of(costTypes);
    // return costtypes;
    return this.httpClient.get<String>(this.serviceUrl + '/hayLwork/excelBatch/?frontDate=' + frontDate);
  }

  getM1M2M3M4(): Observable <Map<string,object>> {
    return this.httpClient.get<Map<string,object>>(this.serviceUrl + '/hayLwork/getM1M2M3M4');
  }
}
