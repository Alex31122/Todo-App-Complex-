import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddList } from './add-list';

describe('AddList', () => {
  let component: AddList;
  let fixture: ComponentFixture<AddList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
