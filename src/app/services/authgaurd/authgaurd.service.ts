import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { Router } from "@angular/router";

@Injectable()
export class AuthgaurdService implements CanActivate {

  getLoggedInStatus: boolean;
  userInfo: any;

  constructor(
    private _getSetSessionDetails: GetSetSessionDetails,
    private _Router: Router
  ) { }

  //This will be triggered every time router navigation attempted and will allow navigation only when return value is true...
  canActivate(): any {
    if (Object.keys(this._getSetSessionDetails.userInfoDetails()).length == 0) {
      this._Router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
