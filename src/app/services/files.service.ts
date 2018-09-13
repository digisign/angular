import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Http} from '@angular/http';
@Injectable()
export class FilesService {

  constructor( public httpClient:HttpClient,public http:Http) { }
  /*pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8085/files', formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }*/

}
