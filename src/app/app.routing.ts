import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UrlPermission } from './urlPermission/url.permission';
import { HomeComponent } from './components/home/home.component';
import { FileuplodComponent } from './components/fileuplod/fileuplod.component';
import { CredentialsviewsComponent } from './components/credentialsviews/credentialsviews.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { CertificateStatusComponent } from './components/certificate-status/certificate-status.component';
import { AuthgaurdService } from './services/authgaurd/authgaurd.service';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'fileupload', component: FileuplodComponent, canActivate: [AuthgaurdService]},
  { path: 'Credentialsviews', component: CredentialsviewsComponent, canActivate: [AuthgaurdService]},
  { path: 'UploadDetails', component: UploadDetailsComponent, canActivate: [AuthgaurdService] },
  { path: 'dashboard', component: CertificateStatusComponent, canActivate: [AuthgaurdService] },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];