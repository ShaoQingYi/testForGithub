import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyDetailEntity } from '../MoneyDetailEntity';
import { MoneyDetailService } from '../money-detail.service';
import { NgForm } from '@angular/forms';
import { costType } from '../costType';
import { payMethod } from '../payMethod';
import { incomeType } from '../incomeType';

import {AppComponent} from '../app.component';
import {ActivatedRoute, Router} from '@angular/router';

import { MoneyDetailInfoComponent} from './money-detail-info.component';

@Component({
  selector: 'app-money-detail',
  templateUrl: './money-detail.component.html',
  styleUrls: ['./money-detail.component.css']
})
export class MoneyDetailComponent implements OnInit {

  constructor(private moneyDetailService: MoneyDetailService,
              private appComponent: AppComponent,
              private router: Router,
              private route: ActivatedRoute,
              private moneyDetailInfo: MoneyDetailInfoComponent) { }

  ngOnInit(): void {
    this.getCostTypes();
    this.getPayMethods();
    this.getIncomeTypes();
  }
  
  msg?: String;
  error?: String;

  // 入账: true or 出帐: false?:boolean;
  selectedOptionInorOut: String = "Out";
  isOut = true;

  // costTypes
  costTypes : costType[] = [];
  // payMethods
  payMethods : payMethod[] = [];
  // incomeTypes
  incomeTypes : incomeType[] = [];

  // 表示用
  costTypeForView?: string;
  payMethodForView?: string;
  incomeTypeForView?: string;

  // 初期
  moneyDetail = new MoneyDetailEntity(true, this.moneyDetailService.getToday(),
                                      '', 0, '', '', true, '', '' , 0, '');

  submitted = false;

  onSubmit() { 
    this.moneyDetail.inOrOut = this.isOut;

    // 调用后台插入接口
    this.moneyDetailService.insertMoneyDetail(this.moneyDetail)
      .subscribe(() => {
          console.log('添加成功');
          this.moneyDetailInfo.ngOnInit();
          // this.router.navigate(['./moneyDetailInfo'], {relativeTo: this.route});
        },
        (response) => {
          console.error('请求发生错误', response);;
          this.msg = response;
        });
   
    if(this.isOut) {
      this.costTypeForView = this.costTypes[Number(this.moneyDetail.costType)-1].value;
      this.payMethodForView = this.payMethods[Number(this.moneyDetail.payMethod)-1].value;  
    } else {
      this.incomeTypeForView = this.incomeTypes[Number(this.moneyDetail.incomeType)-1].value;
    } 

    this.submitted = true;

    // this.appComponent.ngOnInit();
    setTimeout(() => {
      this.router.navigate(['./moneyDetailInfo'], {relativeTo: this.route});
    }, 10); // 延迟10毫秒
   }

  onClear(moneyDetailForm: NgForm) {
    moneyDetailForm.reset();
    this.moneyDetail = new MoneyDetailEntity(true, this.moneyDetailService.getToday(),
                                              '', 0, '', '', true, '', '' , 0, '');
    moneyDetailForm.controls['inOrOut'].patchValue('Out');
    // this.selectedOptionInorOut = 'Out';
    // this.isOut = true;
  }

  toggleElements() {
    if (this.selectedOptionInorOut === "Out"){
      this.isOut = true;
    }else{
      this.isOut = false;
    }
  }

  getCostTypes(): void {
    this.moneyDetailService.getCostTypes()
      .subscribe(
        costTypes => {
          this.costTypes = costTypes},
        error => {
          this.error = error;
        });
  }

  getPayMethods(): void {
    this.moneyDetailService.getPayMethods()
      .subscribe(payMethods => this.payMethods = payMethods);
  }

  getIncomeTypes(): void {
    this.moneyDetailService.getIncomeTypes()
      .subscribe(incomeTypes => this.incomeTypes = incomeTypes);
  }
}
