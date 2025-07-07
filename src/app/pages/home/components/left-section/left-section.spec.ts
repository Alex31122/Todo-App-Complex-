import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSection } from './left-section';

describe('LeftSection', () => {
  let component: LeftSection;
  let fixture: ComponentFixture<LeftSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
