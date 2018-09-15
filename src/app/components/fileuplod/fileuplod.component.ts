import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { FilesService } from '../../services/files.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-fileuplod',
  templateUrl: './fileuplod.component.html',
  styleUrls: ['./fileuplod.component.css'],
})

export class FileuplodComponent  {
  UserForm: FormGroup;
  UserFile: String;
  selectedFiles: FileList;
  currentFileUpload: File;
  public url = environment.API_ENDPOINT+ "files";
  
  constructor(
    private fb: FormBuilder, 
    public http: Http,
    private _FilesService: FilesService
    ) {
    this.UserForm = this.fb.group({ 'UserFile': ['', Validators.required] })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this._FilesService.uploadFile(this.currentFileUpload).subscribe(event => {
     if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
  }

}

