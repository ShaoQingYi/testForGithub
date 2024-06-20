import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoneyDetailComponent } from './money-detail/money-detail.component';
import { MoneyDetailInfoComponent } from './money-detail/money-detail-info.component';
import { MoneyDetailEditComponent } from './money-detail/money-detail-edit.component';
import { MoneyDetailBatchComponent } from './money-detail-batch/money-detail-batch.component';
import { ChartsComponent } from './charts/charts.component'; 

import { LoginComponent } from './login/login.component';

import { AuthGuard } from './login/AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'moneyDetail', component: MoneyDetailComponent, canActivate: [AuthGuard]},
  { path: 'moneyDetailInfo', component: MoneyDetailInfoComponent, canActivate: [AuthGuard]},
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard]},
  { path: 'excelBatch', component: MoneyDetailBatchComponent, canActivate: [AuthGuard]},
  { path: 'moneyDetail/moneyDetailInfo', component: MoneyDetailInfoComponent, canActivate: [AuthGuard]},
  { path: 'moneyDetailedit/:id', component: MoneyDetailEditComponent, canActivate: [AuthGuard]},
];

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent},
//   { path: 'moneyDetail', component: MoneyDetailComponent},
//   { path: 'moneyDetailInfo', component: MoneyDetailInfoComponent},
//   { path: 'charts', component: ChartsComponent},
//   { path: 'excelBatch', component: MoneyDetailBatchComponent},
//   { path: 'moneyDetail/moneyDetailInfo', component: MoneyDetailInfoComponent},
//   { path: 'moneyDetailedit/:id', component: MoneyDetailEditComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
