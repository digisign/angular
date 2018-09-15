import { Injectable } from '@angular/core';
import { User } from "../model/model.user";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { AppComponent } from "../app.component";
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  constructor(public http: Http) { }


  createAccount(user: User) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let options = new RequestOptions();
    options.headers = headers;

    const URL = environment.API_ENDPOINT + "user";
    return this.http.post(URL, user, options)
      .map(resp => resp.json());
  }

}
