import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FilesService {
  constructor(public _http: Http) { }

  upload(files) {
    const URL = environment.API_ENDPOINT+ "files";
    const type = 'POST';
    const body = files;
    const headers = new Headers({
      'Content-Type': 'multipart/form-data',
      'params': { URL, _type: type, data: body }
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this._http.post(URL, body, options)
    .map(response => response.json())
    .catch(error => Observable.throw(error));
  }

}
