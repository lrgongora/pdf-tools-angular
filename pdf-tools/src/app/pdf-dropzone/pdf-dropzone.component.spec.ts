import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDropzoneComponent } from './pdf-dropzone.component';

describe('PdfDropzoneComponent', () => {
  let component: PdfDropzoneComponent;
  let fixture: ComponentFixture<PdfDropzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfDropzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
