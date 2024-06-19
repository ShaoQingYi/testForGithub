import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailChartComponent } from './expense-detail-chart.component';

describe('ExpenseDetailChartComponent', () => {
  let component: ExpenseDetailChartComponent;
  let fixture: ComponentFixture<ExpenseDetailChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseDetailChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDetailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
