import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UploadCompleteDialogComponent } from '../upload-complete-dialog.component';

@Component({
  selector: 'app-file-uploader2',
  template: `
  <div>
    <label for="fileInput">Choice a directory: </label>  
    <input id="fileInput" type="file" webkitdirectory directory (change)="onDirectorySelected($event)" />

  </div>
  <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [`
    mat-progress-bar {
      margin-top: 20px;
    }
  `]
})
export class FileUploader2Component implements OnInit {
  directory: any;
  files: any[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  onDirectorySelected(event: any) {
    this.directory = event.target.files;
    console.log(this.directory);

     for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      console.log(file);
      console.log(file.type);

      //only xml
      if (file.type === 'text/xml') {
        console.log("-->file: "+file);
        this.files.push(file);
      }

    }
    console.log(this.files);

    this.processFiles();

  }

processFiles() {

  this.loading = true;
  this.files.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  
  for (const file of this.files) {
    if (file.name.endsWith(".xml")) {

      const fileReader = new FileReader();
      fileReader.onload = (e) => {

        console.log(fileReader.result);
        const data = fileReader.result;
        if (data) {
          const blob = new Blob([data], { type: "text/xml" });
          this.sendFile(blob, file.name);
        }
      };
      fileReader.readAsText(file);
    }
  }

  this.loading = false;
}

  sendFile(data: Blob, fileName: string) {

    console.log("Sending file: "+fileName);

    const formData = new FormData();
    formData.append('file', data, fileName);
    this.http.post('http://localhost:8080/upload', formData).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.openDialog();
      },
      (err) => console.error(err)
    );
  }

  openDialog() {
    this.dialog.open(UploadCompleteDialogComponent, {
      data: { message: 'Upload files .xml done!' }
    });
  }

}
