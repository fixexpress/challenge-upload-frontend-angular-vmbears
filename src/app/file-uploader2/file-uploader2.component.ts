import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UploadCompleteDialogComponent } from '../upload-complete-dialog.component';

@Component({
  selector: 'app-file-uploader2',
  template: `
    <div>
      <label for="fileInput">Choice a directory: </label>
      <input
        id="fileInput"
        type="file"
        webkitdirectory
        directory
        (change)="onDirectorySelected($event)"
      />
    </div>
    <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
    `
      mat-progress-bar {
        margin-top: 20px;
      }
    `,
  ],
})
export class FileUploader2Component implements OnInit {
  directory: any;
  files: any[] = [];
  loading = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onDirectorySelected(event: any) {
    this.directory = event.target.files;
    
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      //only xml
      if (file.type === 'text/xml') {
        this.files.push(file);
      }
    }

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
      if (file.name.endsWith('.xml')) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const data = fileReader.result as string;
          const filteredXml = this.filterXMLData(data, 'tagName', 'valueToReplace');
          const blob = new Blob([filteredXml], { type: 'text/xml' });
          this.sendFile(blob, file.name);          
        };
        fileReader.readAsText(file);
      }
    }

    this.openDialog();
    this.loading = false;
  }

  sendFile(data: Blob, fileName: string) {
    console.log('Sending file: ' + fileName);

    const formData = new FormData();
    formData.append('file', data, fileName);
    this.http.post('http://localhost:8080/upload', formData).subscribe(
      (res) => {
        //console.log(res);
      },
      (err) => console.error(err)
    );
  }

  openDialog() {
    this.dialog.open(UploadCompleteDialogComponent, {
      data: { message: 'Upload files .xml done!' },
    });
  }

  filterXMLData(xmlString: string, tagName: string, valueToReplace: string): string {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const nodes = xmlDoc.querySelectorAll(`${tagName} > valor`);
    const nodesArr = Array.from(nodes);
    for (const node of nodesArr) {
      node.textContent = valueToReplace;
    }

    //console.log("TRANSFORMED XML--> ", new XMLSerializer().serializeToString(xmlDoc));
    return new XMLSerializer().serializeToString(xmlDoc);
  }

}
