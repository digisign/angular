import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';

@Injectable()
export class AccountService {

  userInfo = {
    userId: '',
    userName: '',
    active: '',
    email: '',
    socialId: '',
    statusId: '',
    roles: [ ],
  };
  userInfoSubject: Subject<any> = new Subject<any>();

  constructor(public http: Http) { }


  createAccount(user) {
    const URL = environment.API_ENDPOINT + 'user';
    const type = 'POST';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type }
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.post(URL, user, options)
      .map(response =>
        response.json())
      .catch(error => Observable.throw(error));
  }

  getUserDetails(email) {
    const URL = environment.API_ENDPOINT + 'user?email=' + email;
    const type = 'GET';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'params': { URL, _type: type }
    });
    const options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.get(URL, options)
      .map(this.extractData)
      .catch(error => Observable.throw(error));
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

  setUserInfo(res) {
    res.roles.forEach(role => {
      this.userInfo.roles.push({
        roleId: role.roleId,
        roleName: role.roleName,
        roleDesc: role.roleDesc
      });
    });
    this.userInfo.userId = res.userId;
    this.userInfo.userName = res.userName;
    this.userInfo.active = res.active;
    this.userInfo.email = res.email;
    this.userInfo.socialId = res.socialId;
    this.userInfo.statusId = res.statusId;
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUserInfo(): Subject<any> {
    setTimeout(() => {
      if (this.userInfo && this.userInfo.userId) {
        this.userInfoSubject.next(this.userInfo);
      } else {
        try {
          this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
          if (this.userInfo && this.userInfo.userId) {
            this.userInfoSubject.next(this.userInfo);
          } else {
            this.userInfoSubject.next(false);
          }
        } catch (e) {
          return false;
        }
      }
    }, 1);
    return this.userInfoSubject;
  }

  clearUserInfo() {
    sessionStorage.clear();
    this.userInfo = {
      userId: '',
      userName: '',
      active: '',
      email: '',
      socialId: '',
      statusId: '',
      roles: [
        {
          roleId: '',
          roleName: '',
          roleDesc: ''
        }
      ],
    };
    this.userInfoSubject.next(this.userInfo);
  }

}
