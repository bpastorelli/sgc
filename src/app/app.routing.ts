import { AcessosFuncionalidadesComponent } from './acessos-funcionalidades/acessos-funcionalidades.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './_helpers/auth.guard';
import { MoradorComponent } from './moradores/morador/morador.component';
import { MoradoresComponent } from './moradores/moradores.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResidenciasComponent } from './residencias/residencias.component';
import { ResidenciaComponent } from './residencias/residencia/residencia.component';
import { SummaryAddComponent } from './summary/add/summary-add.component';
import { SummaryEditComponent } from './summary/edit/summary-edit.component';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { VisitanteComponent } from './visitantes/visitante/visitante.component';
import { VisitasComponent } from './visitantes/visitas/visitas.component';
import { VisitaComponent } from './visitantes/visita/visita.component';
import { SummaryVisitaComponent } from './summary/add/summary-visita.component';
import { VeiculoComponent } from './veiculos/veiculo/veiculo.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { ModulosComponent } from './modulos/modulos.component';

export const ROUTES: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'moradores', component: MoradoresComponent },
  { path: 'visita/residencia/:codigo', component: VisitaComponent },
  { path: 'visitas', component: VisitasComponent },
  { path: 'visitante/:codigo', component: VisitanteComponent },
  { path: 'visitantes', component: VisitantesComponent },
  { path: 'veiculo/:codigo', component: VeiculoComponent },
  { path: 'veiculo/:acao/visitante/:codigo', component: VeiculoComponent },
  { path: 'veiculos', component: VeiculosComponent },
  { path: 'morador/:codigo', component: MoradorComponent },
  { path: 'morador/residencia/:codigo', component: MoradorComponent },
  { path: 'morador/:acao/residencia/:codigo', component: MoradorComponent },
  { path: 'residencias', component: ResidenciasComponent },
  { path: 'residencia/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao/morador/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao', component: ResidenciaComponent },
  { path: 'modulo/:codigo', component: ModuloComponent},
  { path: 'modulos', component: ModulosComponent},
  { path: 'acessoFuncionalidade/create', component: AcessosFuncionalidadesComponent },
  { path: 'summary-edit', component: SummaryEditComponent },
  { path: 'summary-add', component: SummaryAddComponent },
  { path: 'summary-visita', component: SummaryVisitaComponent },

  // otherwise redirect to home
   //{ path: '**', redirectTo: '' }

];

export const appRoutingModule = RouterModule.forRoot(ROUTES);
