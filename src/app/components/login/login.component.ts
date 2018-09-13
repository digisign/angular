import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { contentHeaders } from '../../components/headers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
 
  constructor(private authService :AuthService, private router: Router,private http:Http) { }

  user: User=new User();
  errorMessage:string;

  ngOnInit() {
  }
  
  login(){
    this.authService.logIn(this.user)
      .subscribe(data=>{
        console.log('Successfull' + data);
        this.router.navigate(['/profile']);
        },err=>{
          console.log(err);
        this.errorMessage="error :  Username or password is incorrect";
        }
      )
  }
}
