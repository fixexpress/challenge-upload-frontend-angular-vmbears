//app.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  //selectedFiles = new FileList();
  //onFileSelected(event: { target: { files: FileList; }; }) {
    //this.selectedFiles = event.target.files;
  //}  

  selectedFiles: File[] = [];
  onFileSelected(event: { target: { files: FileList; }; }) {
    this.selectedFiles = Array.from(event.target.files);
  }


  constructor(private http: HttpClient) {}

  ngOnInit() {}


  onUpload() {

    console.log("uploading...");

    const formData = new FormData();

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
      console.log("file:"+this.selectedFiles[i]);
    }

    console.log("enviado para o BackEnd");
    // enviar para o backend
    this.http.post<any>('http://localhost:8080/upload', formData).pipe(
      map(
        (res) => {
          console.log(res);

        },
        (err: any) => {
          console.log(err);
          
        }
      )
    );

  }
}
