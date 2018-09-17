import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';


@Injectable()
export class SharedService {

    public getFileInfo = new ReplaySubject<any>();

    constructor() { 
    }

}
