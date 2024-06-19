import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MoneyDetailsFromSpringboot } from '../MoneyDetailsFromSpringboot';
import { MoneyDetailService } from '../money-detail.service';

import {AppComponent} from '../app.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-money-detail-info',
  templateUrl: './money-detail-info.component.html',
  styleUrls: ['./money-detail-info.component.css']
})
export class MoneyDetailInfoComponent implements OnInit {

  constructor(private moneyDetailService: MoneyDetailService,
    private cdr: ChangeDetectorRef,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedDate = this.moneyDetailService.getToday();

    this.msg="";
    this.moneyDetailService.getAllMoneyDetails()
      .subscribe((MoneyDetails: any) =>  {
          this.moneyDetails = MoneyDetails;

          // 初期时只显示当天的收支状况
          this.moneyDetails = this.moneyDetails.filter(item => item.writeTime == this.selectedDate);

          this.moneyDetailsForSelectBake = MoneyDetails},
        error => {
          this.error = error;
        });

    this.getM1M2M3M4();

    // 异步加载后，刷新页面
    this.cdr.detectChanges();
  }

  // costTypes
  moneyDetails : MoneyDetailsFromSpringboot[] = [];
  moneyDetailsForSelectBake : MoneyDetailsFromSpringboot[] = [];
  error?: String;
  msg?: String;

  selectedDate?: String;

  m1: String = "0";
  m2: String = "0";
  m3: String = "0";
  m4: String = "0";
  responseM1M2M3M4?:any;

  // 只显示选中日期的数据
  filterData(): void {
    if (this.selectedDate){
      this.moneyDetails = this.moneyDetailsForSelectBake.filter(item => item.writeTime == this.selectedDate);
    } else {
      this.moneyDetails = this.moneyDetailsForSelectBake;
    }
  }

  // 显示所有数据
  onClear() {
    this.selectedDate = "";
    this.filterData();
  }

  /**
   * 点击删除按钮时删除对应的教师
   * @param teacher 要删除的教师
   */
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.moneyDetailService.deleteMoneyDetailById(id, Object())
      .subscribe(() => {
        console.log('删除成功');
        this.ngOnInit();

        // this.msg="删除成功";

        // 异步加载后，刷新页面
      //  this.cdr.detectChanges();
      }, () => {
        console.log('删除失败');
        // this.msg="删除成功";
      });

      setTimeout(() => {
        this.ngOnInit();
        this.router.navigate(['/moneyDetailInfo'], {relativeTo: this.route});
        }, 100); // 延迟10毫秒
    } else {
      // 用户取消删除
      console.log('Deletion cancelled.');
    }

  }

  getM1M2M3M4(): void {
    this.moneyDetailService.getM1M2M3M4().subscribe(
      // localStorage.setItem('token', response.token);
      // 处理登录成功后的逻辑，如导航到其他页面

      (data) => {
      this.responseM1M2M3M4 = data;

      this.m1 = this.responseM1M2M3M4.m1;
      this.m2 = this.responseM1M2M3M4.m2;
      this.m3 = this.responseM1M2M3M4.m3;
      this.m4 = this.responseM1M2M3M4.m4;
    }, error => {
      console.error('getM1M2M3M4 error:', error);
    });
  }

}
