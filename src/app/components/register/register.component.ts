import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "../../model/model.user";
import { AccountService } from "../../services/account.service";
import { Router, ActivatedRoute } from "@angular/router";
import { RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  roleName: string;
  formValue={};
  roleId: any;

  constructor(
    public accountService: AccountService,
    public router: Router,
    private route: ActivatedRoute,
    private _RolesService: RolesService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roleId = params['id'];
      this._RolesService.getRoles().subscribe(
        res => {
          res.forEach(element => {
            if(element.roleId == this.roleId) {
              this.roleName = element.roleName;
            }
          });
        });
    });
  }

  register(formValue, id) {
    formValue.roleId = parseInt(id);
    this.accountService.createAccount(formValue).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      this.errorMessage = "username already exist";
    });
  }

}
