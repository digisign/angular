import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { AccountService } from './services/account.service';
import { ProfileComponent } from './components/profile/profile.component';
import { routing } from './app.routing';
import { UrlPermission } from './urlPermission/url.permission';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { HomeComponent } from './components/home/home.component';
import { FileuplodComponent } from './components/fileuplod/fileuplod.component';
import { FilepdfComponent } from './components/filepdf/filepdf.component';
import { CredentialsviewsComponent } from './components/credentialsviews/credentialsviews.component';
import { FilesComponent } from './components/files/files.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { CertificateStatusComponent } from './components/certificate-status/certificate-status.component';
import { FilesService } from './services/files.service';
import { UploadDetailsService } from './services/upload-details/upload-details.service';
import { RolesService } from './services/roles/roles.service';
import { GetSetSessionDetails } from './utils/getSessionDetails';
import { SharedService } from './services/shared.service';
import { HeaderComponent } from './common/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    FileuplodComponent,
    CredentialsviewsComponent,
    FilesComponent,
    UploadDetailsComponent,
    CertificateStatusComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFileUploaderModule
  ],
  providers: [
    AuthService,
    AccountService,
    UrlPermission,
    FilesService,
    UploadDetailsService,
    RolesService,
    GetSetSessionDetails,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
