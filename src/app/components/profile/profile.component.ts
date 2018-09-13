import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {PdfService} from '../../components/filepdf/pdf.service';
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
  constructor(public authService: AuthService, public router: Router,private pdfService:PdfService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


  }

  ngOnInit() {this.pdfSrcArr.push(this.pdfService.getPDF());
  }

  onFileSelected(){
    let img:any=document.querySelector("#file");
    if(typeof(FileReader)!=='undefined')
    {
      let reader=new FileReader();
      reader.onload=(e:any)=>{
        // this.pdfSrc=e.target.result;
        this.pdfSrcArr.push(e.target.result);
      }
      reader.readAsArrayBuffer(img.files[0]);
    }
  }

// login out from the app
  logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }
}
