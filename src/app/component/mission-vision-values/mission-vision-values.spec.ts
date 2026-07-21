import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionVisionValues } from './mission-vision-values';

describe('MissionVisionValues', () => {
  let component: MissionVisionValues;
  let fixture: ComponentFixture<MissionVisionValues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionVisionValues],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionVisionValues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
