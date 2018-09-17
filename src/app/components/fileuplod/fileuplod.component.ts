import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { Router } from "@angular/router";

@Component({
  selector: 'app-fileuplod',
  templateUrl: './fileuplod.component.html',
  styleUrls: ['./fileuplod.component.css']
})

export class FileuplodComponent implements OnInit {
  status;
  public url = environment.API_ENDPOINT + "files";
  @ViewChild('fileUpload')
  private fileUpload: AngularFileUploaderComponent;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI: {
      url: this.url
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false
  };

  constructor(
    private fb: FormBuilder,
    public http: Http,
    private router: Router
  ) { }

  ngOnInit() { }


  getFileUploadResponse(res) {
    if(res.status == 200) {
      this.status= res.status;
    }
  }

  goTo() {
    this.router.navigate(['/UploadDetails']);
  }
}

