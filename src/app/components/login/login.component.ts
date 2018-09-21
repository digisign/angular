import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { User } from "../../model/model.user";
import { AuthService } from "../../services/auth.service";
import { AccountService } from "../../services/account.service";
import { Router } from "@angular/router";
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { SharedService } from '../../services/shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @Output() setuserinfo: EventEmitter<any> = new EventEmitter();
  constructor(
    private authService: AuthService,
    private router: Router,
    private _AccountService: AccountService,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _SharedService: SharedService
  ) { }

  user: User = new User();
  errorMessage: string;

  ngOnInit() {
  }

  login() {
    this.authService.logIn(this.user).subscribe(data => {
      const email = this.user.email;
      if (data.status == 200) {
        this._AccountService.getUserDetails(email).subscribe(
          res => {
            this._AccountService.setUserInfo(res);
            this._AccountService.userInfoSubject.next(this._AccountService.getUserInfo());
            this._SharedService.getUserInfo.next(this._GetSetSessionDetails.userInfoDetails());
            this.router.navigate(['/dashboard']);
          });
      }
    }, err => {
      this.errorMessage = "Enter Valid Username/password";
    });
  }
}
