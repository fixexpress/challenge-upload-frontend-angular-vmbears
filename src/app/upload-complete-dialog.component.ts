//upload-complete-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Upload completo!</h1>
    <div mat-dialog-actions style="text-align: center;">
        <button mat-button  (click)="matDialogModule.close()">OK</button>
    </div>
  `
})
export class UploadCompleteDialogComponent {
    constructor(public matDialogModule: MatDialogRef<UploadCompleteDialogComponent>) {}

    close() {
      this.matDialogModule.close();
    }
}

