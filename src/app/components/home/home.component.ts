import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeBtn = '';
  roles = [];
  constructor(
    private router:Router,
    private _RolesService: RolesService
    ) { }

  ngOnInit() {
    this._RolesService.getRoles().subscribe(
      res=> {
        this.roles = res;
      },
      error => {

      }); 
  }
  goTo(id) {
    this.router.navigate(['/register', {id: id}]);
  }
}
