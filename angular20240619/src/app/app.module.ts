import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoneyDetailComponent } from './money-detail/money-detail.component';

import { HttpClientModule } from '@angular/common/http';
import { MoneyDetailInfoComponent } from './money-detail/money-detail-info.component';
import { MoneyDetailEditComponent } from './money-detail/money-detail-edit.component';
import { MoneyDetailBatchComponent } from './money-detail-batch/money-detail-batch.component';
import { LoginComponent } from './login/login.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts/charts.component';

import { Chart } from 'chart.js';

import { ChartsModule } from 'ng2-charts';
// import {ChartsModule} from 'ng2-charts'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MoneyDetailComponent,
    MoneyDetailInfoComponent,
    MoneyDetailEditComponent,
    MoneyDetailBatchComponent,
    LoginComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule, // ‰∏∫‰∫?‰ΩøÁî®filter
    FormsModule, BrowserAnimationsModule,// ‰∏∫‰∫?Áª?‰ª∂ËÉΩÁî® NgModule?ºåÈúÄË¶ÅÂºïÂ?•Ëøô‰∏™
    ChartsModule
  ],
  providers: [MoneyDetailInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
