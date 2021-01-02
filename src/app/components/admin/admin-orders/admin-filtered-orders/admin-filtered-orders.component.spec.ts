import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilteredOrdersComponent } from './admin-filtered-orders.component';

describe('AdminFilteredOrdersComponent', () => {
  let component: AdminFilteredOrdersComponent;
  let fixture: ComponentFixture<AdminFilteredOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFilteredOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilteredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
