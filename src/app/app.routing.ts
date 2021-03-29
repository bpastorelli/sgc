import { SummaryEditComponent } from './summary/summary-edit/summary-edit.component';
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './_helpers/auth.guard';
import { MoradorComponent } from './moradores/morador/morador.component';
import { MoradoresComponent } from './moradores/moradores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'moradores', component: MoradoresComponent },
  { path: 'morador/', component: MoradorComponent },
  { path: 'morador/:codigo', component: MoradorComponent },
  { path: 'summary-edit', component: SummaryEditComponent }

  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(ROUTES);
