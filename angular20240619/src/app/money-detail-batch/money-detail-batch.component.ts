import { Component, OnInit } from '@angular/core';
import { MoneyDetailService } from '../money-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-money-detail-batch',
  templateUrl: './money-detail-batch.component.html',
  styleUrls: ['./money-detail-batch.component.css']
})
export class MoneyDetailBatchComponent implements OnInit {

  maxDate?: string;
  minDate?: string;

  constructor(private moneyDetailService: MoneyDetailService,) {}

  ngOnInit(): void {
    this.writeTimeForSpringboot = this.moneyDetailService.getToday();
    this.maxDate = this.moneyDetailService.getToday();
    this.minDate = this.moneyDetailService.getMinDate();
  }

  responseMsg?:any;
  msg?: String;
  writeTimeForSpringboot = this.moneyDetailService.getToday();

  onSubmit() {
    // if (confirm('处理日期确定：'+ this.writeTimeForSpringboot)) {
    this.moneyDetailService.excelBatchBydate(this.writeTimeForSpringboot)
      .subscribe((data) => {
        this.responseMsg = data;
        this.msg = this.responseMsg.msg;
        // confirm('处理完了')
      },
        () => {
          console.log(`失败`);
        });
    // }
  }

  onClear(moneyDetailForm: NgForm) {
    this.writeTimeForSpringboot = this.moneyDetailService.getToday();
    this.msg = "";
    // moneyDetailForm.reset();
  }

  getTestBed (): string  {
    return this.moneyDetailService.getToday();
  }

}
