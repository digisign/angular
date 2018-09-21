import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SharedService {

    public getFileInfo = new ReplaySubject<any>();
    public getUserInfo: Subject<any> = new Subject<any>();

    constructor() {
    }

    getUserName(): Observable<any> {
        return this.getUserInfo.asObservable();
    }

}
