import { Component, OnInit } from '@angular/core';
import {Routes, Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeBtn = '';
  constructor(private router:Router) { }

  ngOnInit() {
  }
  myFunction(btn)
  {   
    this.activeBtn = btn;
    
  }
  goPlaces() {
    this.router.navigate(['/register']);
  }
}
