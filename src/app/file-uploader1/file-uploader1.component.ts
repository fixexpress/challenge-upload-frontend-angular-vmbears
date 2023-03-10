import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UploadCompleteDialogComponent } from '../upload-complete-dialog.component';
import { FileUploadService } from '../file-uploader.service';

@Component({
  selector: 'app-file-uploader1',
  templateUrl: './file-uploader1.component.html',
  styleUrls: ['./file-uploader1.component.css'],
})

export class FileUploader1Component implements OnInit {
  selectedFiles: File[] = [];
  uploadProgress = 0;
  isLoading = false;
  showDialog = false;

  constructor(
    @Inject(FileUploadService) private fileUploaderService: FileUploadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files) as File[];
    this.selectedFiles = this.selectedFiles.filter(
      (file) => file.type === 'application/xml' || file.type === 'text/xml'
    );
  }

  onUpload() {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least only one XML file type to upload.');
      return;
    }

    this.isLoading = true;
    const reader = new FileReader();
    reader.onload = (event) => {


      const alteredXML = this.filterXMLData((event.target as any).result, 'precoMedio', '0.0')
      this.selectedFiles[0] = new File([alteredXML],this.selectedFiles[0].name);

      //UPLOAD changed file
      this.fileUploaderService.upload(this.selectedFiles[0])
        .pipe(
          map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (event.total) {
                  this.uploadProgress = Math.round(
                    (event.loaded / event.total) * 100
                  );
                  return this.uploadProgress;
                } else {
                  return this.uploadProgress;
                }
              case HttpEventType.Response:
                return event;
              default:
                return `Unhandled event: ${event.type}`;
            }
          }),
          startWith(0)
        )
        .subscribe((event: any) => {
          if (event instanceof HttpResponse) {
            this.isLoading = false;
            this.showDialog = true;
            this.dialog.open(UploadCompleteDialogComponent, {
              data: { message: 'File Uploaded Successfully!' },
            });
            this.selectedFiles = [];
          }
        });
    };
    reader.readAsText(this.selectedFiles[0]);

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
