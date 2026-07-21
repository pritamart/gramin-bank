import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRegulatoryNotices } from './corporate-regulatory-notices';

describe('CorporateRegulatoryNotices', () => {
  let component: CorporateRegulatoryNotices;
  let fixture: ComponentFixture<CorporateRegulatoryNotices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateRegulatoryNotices],
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateRegulatoryNotices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
