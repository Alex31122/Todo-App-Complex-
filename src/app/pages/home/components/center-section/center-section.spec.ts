import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSection } from './center-section';

describe('CenterSection', () => {
  let component: CenterSection;
  let fixture: ComponentFixture<CenterSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
