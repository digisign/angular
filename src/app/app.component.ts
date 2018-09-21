import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetSetSessionDetails } from './utils/getSessionDetails';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Digital Credentials';
  userInfo: any;
  @Output() setuserinfo: EventEmitter<any> = new EventEmitter();

  constructor(
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _Router: Router
  ) {}

  ngOninit() {
    if(Object.keys(this._GetSetSessionDetails.userInfoDetails()).length == 0) {
      this._Router.navigate(['home']);
    } 
  }

}
