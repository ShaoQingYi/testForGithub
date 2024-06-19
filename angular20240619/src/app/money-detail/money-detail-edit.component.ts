import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MoneyDetailEntity } from '../MoneyDetailEntity';
import { MoneyDetailService } from '../money-detail.service';
import { costType } from '../costType';
import { payMethod } from '../payMethod';
import { incomeType } from '../incomeType';

import {AppComponent} from '../app.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-money-detail-edit',
  templateUrl: './money-detail-edit.component.html',
  styleUrls: ['./money-detail-edit.component.css']
})
export class MoneyDetailEditComponent implements OnInit {

  public moneyDetail: MoneyDetailEntity =new MoneyDetailEntity(true, this.moneyDetailService.getToday(),
                                                               '', 0, '', '', true, '', '' , 0, '');

  public moneyDetailTemp?: any;

  id: number = 0;

  msg?: String;
  error?: String;

  // 入?: true or 出?: false?:boolean;
  selectedOptionInorOut?: String;
  isOut = true;

  // costTypes
  costTypes : costType[] = [];
  // payMethods
  payMethods : payMethod[] = [];
  // incomeTypes
  incomeTypes : incomeType[] = [];

  submitted = false;
 
  constructor(private moneyDetailService: MoneyDetailService,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCostTypes();
    this.getPayMethods();
    this.getIncomeTypes();

    this.route.params.subscribe(data => {
      console.log('路由参数?生?化，接收通知');
      this.id = data['id'];
      this.load();

      // if (this.moneyDetail.inOrOut) {
      //   this.selectedOptionInorOut = "Out";
      // }else {
      //   this.selectedOptionInorOut = "In";
      // }
    });

    // ??加?后，刷新?面
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  
  /**
   * 当路由参数?生?化?，加?教?数据。
   */
  load(): void {
    console.log('加载数据');
    this.moneyDetailService.getMoneyDetailbyId(this.id)
      .subscribe((data) => {
        this.moneyDetailTemp = data;
        this.moneyDetail = this.moneyDetailTemp;
        // // ??加?后，刷新?面
        // this.cdr.detectChanges();
        this.cdr.markForCheck();
        this.cdr.detectChanges();

        if(this.moneyDetailTemp.inOrOut) {
          this.selectedOptionInorOut = "Out";
          this.isOut = true;
        }else {
          this.selectedOptionInorOut = "In";
          this.isOut = false;
        }

        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }, () => {
        console.log(`?求 ${this.id} ??生??`);
      });
  }

  onSubmit() { 
    this.moneyDetail.inOrOut = this.isOut;

    // ?用后台插入接口
    this.moneyDetailService.updateMoneyDetailById(this.id, this.moneyDetail)
      .subscribe( function () {
      console.log('更新成功');
    },
    (response) => {
      console.error('?求?生??', response);;
      this.msg = response;
    });

    this.submitted = true;

    this.appComponent.ngOnInit();
    setTimeout(() => {
      this.router.navigate(['/moneyDetailInfo'], {relativeTo: this.route});
    }, 10); // 延迟10毫秒
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

  goBack(): void {
    this.location.back();
  }
}