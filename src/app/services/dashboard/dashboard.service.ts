import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: Http) { }

  getUserFiles() {
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
}
