import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingServices } from './banking-services';

describe('BankingServices', () => {
  let component: BankingServices;
  let fixture: ComponentFixture<BankingServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingServices],
    }).compileComponents();

    fixture = TestBed.createComponent(BankingServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
