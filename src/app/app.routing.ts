import { UnauthorizedComponent } from './summary/unauthorized/unauthorized.component';
import { Routes, RouterModule } from '@angular/router'

import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
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
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { FuncionalidadeComponent } from './funcionalidades/funcionalidade/funcionalidade.component';
import { ImportarContribuicoesComponent } from './contribuicoes/importar-contribuicoes/importar-contribuicoes.component';
import { ContribuicoesComponent } from './contribuicoes/contribuicoes.component';
import { MinhasContribuicoesComponent } from './contribuicoes/minhas-contribuicoes/minhas-contribuicoes.component';
import { AcessosModulosComponent } from './acessos-modulos/acessos-modulos.component';
import { AcessosFuncionalidadesComponent } from './acessos-funcionalidades/acessos-funcionalidades.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VincularMoradorComponent } from './vincular-morador/vincular-morador.component';

export const ROUTES: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'moradores', component: MoradoresComponent },
  { path: 'visita/residencia/:codigo', component: VisitaComponent },
  { path: 'visita/residencia/:codigo/rg/:rg', component: VisitaComponent },
  { path: 'visitas', component: VisitasComponent },
  { path: 'visitante/:acao', component: VisitanteComponent },
  { path: 'visitante/:codigo', component: VisitanteComponent },
  { path: 'visitante/:acao/:codigo', component: VisitanteComponent },
  { path: 'visitante/:acao/residencia/:residencia/rg/:rg', component: VisitanteComponent },
  { path: 'visitantes', component: VisitantesComponent },
  { path: 'veiculo/:acao', component: VeiculoComponent },
  { path: 'veiculo/:acao/:codigo', component: VeiculoComponent },
  { path: 'veiculo/:acao/visitante/:codigo', component: VeiculoComponent },
  { path: 'veiculo/:acao/ticket/:ticket', component: VeiculoComponent },
  { path: 'veiculos', component: VeiculosComponent },
  { path: 'morador/:acao/:codigo', component: MoradorComponent },
  { path: 'morador/:acao', component: MoradorComponent },
  { path: 'morador/residencia/:codigo', component: MoradorComponent },
  { path: 'morador/:acao/residencia/:codigo', component: MoradorComponent },
  { path: 'morador/:acao/ticket/:ticket', component: MoradorComponent },
  { path: 'residencias/:ticket', component: ResidenciasComponent },
  { path: 'residencias', component: ResidenciasComponent },
  { path: 'residencia/:acao', component: ResidenciaComponent },
  { path: 'residencia/:acao/morador/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao/:codigo', component: ResidenciaComponent },
  { path: 'residencia/:acao/ticket/:ticket', component: ResidenciaComponent },
  { path: 'vincularmorador/create', component: VincularMoradorComponent},
  { path: 'modulo/:acao/:codigo', component: ModuloComponent},
  { path: 'modulo/:acao', component: ModuloComponent},
  { path: 'modulos', component: ModulosComponent},
  { path: 'modulos/:descricao', component: ModulosComponent},
  { path: 'acessoFuncionalidade/create', component: AcessosFuncionalidadesComponent },
  { path: 'acessomodulo/create', component: AcessosModulosComponent },
  { path: 'funcionalidades', component: FuncionalidadesComponent},
  { path: 'funcionalidade/:codigo', component: FuncionalidadeComponent},
  { path: 'importar', component: ImportarContribuicoesComponent },
  { path: 'contribuicoes', component: ContribuicoesComponent },
  { path: 'minhascontribuicoes', component: MinhasContribuicoesComponent },
  { path: 'summary-edit', component: SummaryEditComponent },
  { path: 'summary-add', component: SummaryAddComponent },
  { path: 'summary-visita', component: SummaryVisitaComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'alterarsenha/:acao', component: AlterarSenhaComponent },

  // otherwise redirect to home
   //{ path: '**', redirectTo: '' }

];

export const appRoutingModule = RouterModule.forRoot(ROUTES);
