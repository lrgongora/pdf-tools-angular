import { Component, OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-dropzone-preview',
  templateUrl: './pdf-dropzone-preview.component.html',
  styleUrls: ['./pdf-dropzone-preview.component.css'],
  providers: [{
    provide: NgxDropzonePreviewComponent,
    useExisting: PdfDropzonePreviewComponent
  }]
})
export class PdfDropzonePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {

  constructor(sanitizer: DomSanitizer) {
    super(sanitizer);
   }

  ngOnInit(): void {
    if (!this.file) {
      console.error('No file to read. Please provide a file using the [file] Input property.');
      return;
    }

    console.log(this.file);
  }

}
