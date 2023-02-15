//file-uploader.service.ts
import { HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private endpoint = 'http://localhost:8080/upload';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    console.log(file);

    const formData = new FormData();
    formData.append('file', file, file.name);
    
    const req = new HttpRequest('POST', this.endpoint, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
    
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(`Upload progress: ${Math.round(100 * event.loaded / event.total!)}%`);
      } else if (event.type === HttpEventType.Response) {
        console.log(`Upload completed!`);
      }
    });

  }
}
