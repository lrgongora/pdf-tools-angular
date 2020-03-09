import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PdfDropzoneComponent } from './pdf-dropzone/pdf-dropzone.component';
import { MergeUtilityComponent } from './merge-utility/merge-utility.component';
import { SplitUtilityComponent } from './split-utility/split-utility.component';
import { PdfDropzonePreviewComponent } from './pdf-dropzone-preview/pdf-dropzone-preview.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SortablejsModule } from 'ngx-sortablejs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DragulaModule } from 'ng2-dragula';
import { TabModule } from 'angular-tabs-component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 10,
  paramName: function() {
      return "files"
  },
  previewsContainer: ".dropzone-previews",
  dictDefaultMessage: 'Drop a PDF here to upload, or click to select one',
  maxFiles: 10,
  acceptedFiles: 'application/pdf',
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PdfDropzoneComponent,
    MergeUtilityComponent,
    SplitUtilityComponent,
    PdfDropzonePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    DropzoneModule,
    SortablejsModule.forRoot({ animation: 150 }),
    DragulaModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    TabModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
