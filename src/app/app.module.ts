import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import {PdfViewerModule} from 'ng2-pdf-viewer'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {AccountService} from "./services/account.service";
import { ProfileComponent } from './components/profile/profile.component';
import {routing} from "./app.routing";
import {UrlPermission} from "./urlPermission/url.permission";

import { HomeComponent } from './components/home/home.component';
import { FileuplodComponent } from './components/fileuplod/fileuplod.component';
import { FilepdfComponent } from './components/filepdf/filepdf.component';
import {MyFileUpload}  from './components/newfileupload/myfileupload.component';
import { CredentialsviewsComponent } from './components/credentialsviews/credentialsviews.component';
import { FilesComponent } from './components/files/files.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { CertificateStatusComponent } from './components/certificate-status/certificate-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    MyFileUpload,
    FileuplodComponent,
    FilepdfComponent,
    FileSelectDirective,
    CredentialsviewsComponent,
    FilesComponent,
    UploadDetailsComponent,
    CertificateStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [AuthService,AccountService,UrlPermission],
  bootstrap: [AppComponent]
})
export class AppModule { }
