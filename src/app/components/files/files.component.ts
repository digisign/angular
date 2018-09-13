import { Component, OnInit } from '@angular/core';

import{FilesService} from "../../services/files.service";

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  [x: string]: any;

  constructor() { }
  selectedFiles: FileList;
  currentFileUpload: File;
  ngOnInit() {
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }


upload() {
  this.currentFileUpload = this.selectedFiles.item(0);
  this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
   if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');
    }
  });
  this.selectedFiles = undefined;
}
}