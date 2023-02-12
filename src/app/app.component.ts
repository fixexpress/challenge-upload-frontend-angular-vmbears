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

    
}
