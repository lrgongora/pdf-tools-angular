import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitUtilityComponent } from './split-utility.component';

describe('SplitUtilityComponent', () => {
  let component: SplitUtilityComponent;
  let fixture: ComponentFixture<SplitUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
