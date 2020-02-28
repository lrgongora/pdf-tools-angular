import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeUtilityComponent } from './merge-utility.component';

describe('MergeUtilityComponent', () => {
  let component: MergeUtilityComponent;
  let fixture: ComponentFixture<MergeUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
