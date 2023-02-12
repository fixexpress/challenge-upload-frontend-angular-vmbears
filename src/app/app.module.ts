//app.module.js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileUploader1Component } from './file-uploader1/file-uploader1.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadService } from './file-uploader.service';
import { FileUploader2Component } from './file-uploader2/file-uploader2.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploader1Component,
    FileUploader2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,    
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

