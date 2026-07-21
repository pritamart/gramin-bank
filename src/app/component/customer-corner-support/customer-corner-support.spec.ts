import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCornerSupport } from './customer-corner-support';

describe('CustomerCornerSupport', () => {
  let component: CustomerCornerSupport;
  let fixture: ComponentFixture<CustomerCornerSupport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCornerSupport],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCornerSupport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
