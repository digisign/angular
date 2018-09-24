import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { Router } from "@angular/router";
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { subscribeOn } from 'rxjs/operators';
import { UploadDetailsService } from '../../services/upload-details/upload-details.service';
import { AlertMessageService } from '../../services/alert-message/alert-message.service';



@Component({
  selector: 'app-certificate-status',
  templateUrl: './certificate-status.component.html',
  styleUrls: ['./certificate-status.component.css']
})
export class CertificateStatusComponent implements OnInit {

  status;
  fileinfo = [];
  public uri;
  @ViewChild('fileUpload')
  private fileUpload: AngularFileUploaderComponent;
  public imageURL;
  userId;
  url;
  fileName = [];
  userDetails = [];
  afuConfig = {};

  constructor(
    private router: Router,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _UploadDetailsService: UploadDetailsService,
    private _AlertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.userId = this._GetSetSessionDetails.userInfoDetails().userId;
    this.url = environment.API_ENDPOINT + 'user/' + this.userId + '/files';
    this.imageURL = environment.API_ENDPOINT+ 'files?fileName=';

    this.afuConfig = {
      multiple: true,
      formatsAllowed: ".jpg,.png,.pdf",
      maxSize: "5",
      uploadAPI: {
        url: this.url
      },
      attachPinText: "Choose file to Upload",
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
    };

    this.getDocumentList(this.userId);
  }

  getFileUploadResponse(res) {
    if (res.status == 200) {
      this.status = res.status;
      this.getDocumentList(this.userId);
    }

    if (res.status < 200 || res.status >= 300) {
      this._AlertMessageService.sendMessage("Something went wrong!!!", res.status, "Error");
    }
  }

  getDocumentList(userId) {
    this._UploadDetailsService.fetchALLCredetailResource(userId).subscribe(res => {
      this.userDetails = res;
      this.fileName =[];
      this.userDetails.forEach((element, index) => {
        let tempName = element.filePath;
        this.userDetails[index].filePath = tempName.slice(0, tempName.lastIndexOf('_'));
      });
    });
  }

  goTo(id) {
    this.router.navigate(['/UploadDetails', {id: id}]);
  }

}
