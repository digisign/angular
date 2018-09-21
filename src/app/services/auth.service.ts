import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from "../model/model.user";
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: Http) { }
  public logIn(user: User) {
    var base = {
      email: user.email,
      password: user.password
    }
    const URL = environment.API_ENDPOINT + "login";
    const type = 'POST';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type}
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.post(URL, base, options);
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(environment.API_ENDPOINT + "logout", {})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }
}
