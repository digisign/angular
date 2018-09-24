import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AuthgaurdService } from './services/authgaurd/authgaurd.service';
import { HttpModule } from "@angular/http";
import { AccountService} from "./services/account.service";
import { appRoutes } from "./app.routing";
import { UrlPermission } from "./urlPermission/url.permission";
import { MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FileuplodComponent } from './components/fileuplod/fileuplod.component';
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
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    AngularFileUploaderModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    AuthgaurdService,
    AccountService,
    UrlPermission,
    FilesService,
    UploadDetailsService,
    RolesService,
    GetSetSessionDetails,
    SharedService,
    LoginComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
