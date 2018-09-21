import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  getUserInfo: any = {};
  constructor(
    private _SharedService: SharedService,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _AccountService: AccountService,
    private _Router: Router
  ) { 
    this._SharedService.getUserName().subscribe(res => this.getUserInfo = res);
  }

  ngOnInit() {
    if(Object.keys(this._GetSetSessionDetails.userInfoDetails()).length != 0) {
      this.getUserInfo = this._GetSetSessionDetails.userInfoDetails();
    } 
  }

  logout() {
    sessionStorage.clear();
    this.getUserInfo = {};
    console.log(this.getUserInfo);
    this._Router.navigate(['home']);
  }

}
