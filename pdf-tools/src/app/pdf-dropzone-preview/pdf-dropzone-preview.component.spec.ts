import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDropzonePreviewComponent } from './pdf-dropzone-preview.component';

describe('PdfDropzonePreviewComponent', () => {
  let component: PdfDropzonePreviewComponent;
  let fixture: ComponentFixture<PdfDropzonePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfDropzonePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDropzonePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
