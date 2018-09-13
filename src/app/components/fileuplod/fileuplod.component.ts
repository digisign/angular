import { Component, OnInit,ViewChild} from '@angular/core';
// import { HttpService } from '../../common/http.service';
// import { AppConstants } from '../../constants/appconstants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';

import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AppComponent } from '../../app.component';
import { ValueTransformer } from '../../../../node_modules/@angular/compiler/src/util';



@Component({
  selector: 'app-fileuplod',
  templateUrl: './fileuplod.component.html',
  styleUrls: ['./fileuplod.component.css']
})
export class FileuplodComponent implements OnInit {
  UserForm:FormGroup;
  UserFile:String;

  @ViewChild('UserFile')User_File;

  constructor(private fb:FormBuilder,public http: Http) { 
    this.UserForm =this.fb.group({'UserFile':['',Validators.required]})
    

    
  }
onSubmit(value){
  let temp = value.UserFile.split('/');
  this.UserFile = temp[temp.length-1].split('.')[0];
  
 // this.saveFile(value).subscribe(response=>{
    //console.log(response);
 // });
}
  ngOnInit() {
  }

  // // http post method
   //private saveFile(file): Observable<any> {
   
   //console.log(file.UserFile);

   //console.log(localStorage.getItem("currentUser"));
    // return this.http.post(AppComponent.API_URL+'/uploadFile',file.UserFile);
    
   //} 
  

}

