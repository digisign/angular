import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
  
@Injectable({
  providedIn: 'root'
})
export class UploadDetailsService {

  constructor(public http: Http) { }

  getDetails() {
    const URL = environment.API_ENDPOINT+ 'institution';
    const type = 'GET';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type}
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.get(URL, options).map(res => {
      return res.json();
    });
  }

  getGrades() {
    const URL = environment.API_ENDPOINT+ 'grades';
    const type = 'GET';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type}
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.get(URL, options).map(res => {
      return res.json();
    });
  }
}
