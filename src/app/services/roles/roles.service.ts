import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(public http: Http) { }

  getRoles() {
    const URL = environment.API_ENDPOINT+ 'roles';
    const type = 'GET';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type}
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.get(URL, options).map(response => response.json())
    .catch(error => Observable.throw(error));
  }
}
