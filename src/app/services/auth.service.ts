import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from "../model/model.user";
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(public http: Http) { }
  public logIn(user: User) {
    var base = {
      email: user.email,
      password: user.password
    }
    let headers = new Headers();
    headers.append('Accept', 'application/json')

    let options = new RequestOptions();
    options.headers = headers;
    const URL = environment.API_ENDPOINT + "login"
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
