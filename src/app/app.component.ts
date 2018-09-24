import { Component, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetSetSessionDetails } from './utils/getSessionDetails';
import { AlertMessageService } from './services/alert-message/alert-message.service';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Digital Credentials';
  userInfo: any;
  @Input() message: any;
  @Output() setuserinfo: EventEmitter<any> = new EventEmitter();

  constructor(
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _Router: Router,
    private _AlertMessageService: AlertMessageService
  ) {
    //this.changeDetector.detectChanges();
    this._AlertMessageService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOninit() {
    if(Object.keys(this._GetSetSessionDetails.userInfoDetails()).length == 0) {
      this._Router.navigate(['home']);
    } 
  }

}
