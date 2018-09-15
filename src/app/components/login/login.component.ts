import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "../../model/model.user";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Http } from '@angular/http';


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
        this.errorMessage="Enter Valide Username or password";
        }
      )
  }
}
