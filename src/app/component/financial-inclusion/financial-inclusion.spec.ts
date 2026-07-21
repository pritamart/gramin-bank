import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInclusion } from './financial-inclusion';

describe('FinancialInclusion', () => {
  let component: FinancialInclusion;
  let fixture: ComponentFixture<FinancialInclusion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInclusion],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialInclusion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
