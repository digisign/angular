import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/model.user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  roles:any[]
  constructor(public accountService: AccountService, public router: Router,) {
  }

  ngOnInit() {

      /*this.accountService.getAllRoles().subscribe(
        (data:any)=>{
          data.forEach(obj =>obj.selected=false);
          this.roles=data;
        }
      )*/
    
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
      
        this.router.navigate(['/login']);
      
      }, err => {
        console.log(err);
        this.errorMessage = "username already exist";
      }
      
    )
    
  }
 
}
