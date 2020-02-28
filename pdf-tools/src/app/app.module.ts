import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PdfDropzoneComponent } from './pdf-dropzone/pdf-dropzone.component';
import { MergeUtilityComponent } from './merge-utility/merge-utility.component';
import { SplitUtilityComponent } from './split-utility/split-utility.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PdfDropzoneComponent,
    MergeUtilityComponent,
    SplitUtilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
