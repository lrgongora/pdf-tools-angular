import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pdf-dropzone',
  templateUrl: './pdf-dropzone.component.html',
  styleUrls: ['./pdf-dropzone.component.css']
})
export class PdfDropzoneComponent implements OnInit {
  @Input() settings;
  submitFiles() {

  }
  resetDropzone(){

  }

  constructor() { }

  ngOnInit(): void {
  }

}
