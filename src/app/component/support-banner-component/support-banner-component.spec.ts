import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBannerComponent } from './support-banner-component';

describe('SupportBannerComponent', () => {
  let component: SupportBannerComponent;
  let fixture: ComponentFixture<SupportBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
