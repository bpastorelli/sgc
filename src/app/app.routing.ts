import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './_helpers/auth.guard';
import { MoradorComponent } from './moradores/morador/morador.component';
import { MoradoresComponent } from './moradores/moradores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResidenciasComponent } from './residencias/residencias.component';
import { ResidenciaComponent } from './residencias/residencia/residencia.component';
import { SummaryAddComponent } from './summary/dd/summary-add.component';
import { SummaryEditComponent } from './summary/edit/summary-edit.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'moradores', component: MoradoresComponent },
  { path: 'morador/:codigo', component: MoradorComponent },
  { path: 'morador/residencia/:codigo', component: MoradorComponent },
  { path: 'morador/:acao/residencia/:codigo', component: MoradorComponent },
  { path: 'residencias', component: ResidenciasComponent },
  { path: 'residencia/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao/morador/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao', component: ResidenciaComponent },
  { path: 'summary-edit', component: SummaryEditComponent },
  { path: 'summary-add', component: SummaryAddComponent }

  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(ROUTES);
