import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertMessageService {
  message: any;
  commonName: any;
  public subject = new Subject<any>();

  constructor() { }

  sendMessage(message: string, code: any, response: string) {
    this.message = message;
    if (response === 'Error') {
      this.message = this.message;
    } else if (response === 'Success') {
      if (code === '200') {
        this.message = this.message;
      }
    }
    let msg = { 'text': this.message, 'code': code, 'type': response };
    this.subject.next(msg);
    setTimeout(() => this.subject.next(), 5000);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  clearMessage() {
    this.subject.next();
  }

}
