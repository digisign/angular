import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
  
@Injectable({
  providedIn: 'root'
})
export class UploadDetailsService {

  constructor(public http: Http) { }


  fetchALLCredetailResource(userId) {
    const URL = environment.API_ENDPOINT+ 'users/' + userId + '/credentialResource';
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

  formSubmitCredentialResource(values) {
    const URL = environment.API_ENDPOINT+ 'credentialResource';
    const body = values;
    const type = 'POST';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type}
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.post(URL, body, options).map(res => {
      return res;
    });
  }

  getMarksType() {
    const URL = environment.API_ENDPOINT+ 'markTypes';
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

  getInstitutionDetails() {
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
    return this.http.get(URL, options).map(response => response.json())
    .catch(error => Observable.throw(error));
  }
}
