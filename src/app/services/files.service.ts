import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class FilesService {
  constructor(public _http: Http) { }

  uploadFile(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);  
    const URL = environment.API_ENDPOINT+ "files";
    const type = 'POST';
    const body = file;
    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
      'params': { URL, _type: type, data: body }
    });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this._http.post(URL, body, options);
  }

}
