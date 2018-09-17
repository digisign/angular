import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "../../model/model.user";
import { AuthService } from "../../services/auth.service";
import { AccountService } from "../../services/account.service";
import { Router } from "@angular/router";
import { Http } from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _AccountService: AccountService
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
          });
        this.router.navigate(['/fileupload']);
      }
    }, err => {
      this.errorMessage = "Enter Valid Username/password";
    }
    )
  }
}
