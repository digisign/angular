import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {PdfService} from '../../components/filepdf/pdf.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[PdfService],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  page:number=1;
  pdfSrc:string='';
  pdfSrcArr = [];
  constructor(
    public authService: AuthService, 
    public router: Router,
    private pdfService:PdfService,
    private _DashboardService: DashboardService
    ) {}

  ngOnInit() {
    this._DashboardService.getUserFiles().subscribe(res=>{

    });
  }



}
