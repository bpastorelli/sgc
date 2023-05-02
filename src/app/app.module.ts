import { VincularMoradorService } from './vincular-morador/vincular-morador.service';
import { ContribuicoesService } from './contribuicoes/contribuicoes.service';
import { FuncionalidadeService } from './funcionalidades/funcionalidades.service';
import { ModalModule } from './_modal/modal.module';
import { AcessoModuloService } from './acessos-modulos/acessos-modulos.service';
import { AcessoFuncionalidadeService } from './acessos-funcionalidades/acessos-funcionalidades.service';
import { ModulosService } from './modulos/modulos.service';
import { CepComponent } from './cep/cep.component';
import { CepService } from './cep/cepService.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CallbackPipe } from './callback.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UppercaseInputComponent } from './shared/input/uppercaseInput.component';

import { appRoutingModule, ROUTES } from './app.routing';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { InputComponent } from './shared/input/input.component';
import { HttpClientModule } from '@angular/common/http';
import { MoradorService } from './moradores/morador/morador.service';
import { MoradoresComponent } from './moradores/moradores.component';
import { MoradoresService } from './moradores/moradores.service';
import { ResidenciaService } from './residencias/residencia/residencia.service';
import { ResidenciasService } from './residencias/residencias.service';
import { VisitantesService } from './visitantes/visitantes.service';
import { VeiculosService } from './veiculos/veiculos.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { MoradorComponent } from './moradores/morador/morador.component';
import { ResidenciaComponent } from './residencias/residencia/residencia.component';
import { ResidenciasComponent } from './residencias/residencias.component';
import { VisitaComponent } from './visitantes/visita/visita.component';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { VisitanteComponent } from './visitantes/visitante/visitante.component';
import { VisitasComponent } from './visitantes/visitas/visitas.component';
import { SummaryVisitaComponent } from './summary/add/summary-visita.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculoComponent } from './veiculos/veiculo/veiculo.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { AcessosFuncionalidadesComponent } from './acessos-funcionalidades/acessos-funcionalidades.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcessosModulosComponent } from './acessos-modulos/acessos-modulos.component';
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { FuncionalidadeComponent } from './funcionalidades/funcionalidade/funcionalidade.component';
import { ContribuicoesComponent } from './contribuicoes/contribuicoes.component';
import { ImportarContribuicoesComponent } from './contribuicoes/importar-contribuicoes/importar-contribuicoes.component';
import { MinhasContribuicoesComponent } from './contribuicoes/minhas-contribuicoes/minhas-contribuicoes.component';
import { SortDirective } from './_directive/sort.directive';
import { UnauthorizedComponent } from './summary/unauthorized/unauthorized.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { VincularMoradorComponent } from './vincular-morador/vincular-morador.component';
import { VisitasService } from './visitantes/visitas/visitas.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    InputComponent,
    MoradoresComponent,
    MoradorComponent,
    ResidenciaComponent,
    ResidenciasComponent,
    CepComponent,
    VisitantesComponent,
    VisitanteComponent,
    VisitasComponent,
    VisitaComponent,
    VeiculosComponent,
    SummaryVisitaComponent,
    VeiculosComponent,
    VeiculoComponent,
    UppercaseInputComponent,
    CallbackPipe,
    ModulosComponent,
    ModuloComponent,
    AcessosFuncionalidadesComponent,
    AcessosModulosComponent,
    FuncionalidadesComponent,
    FuncionalidadeComponent,
    ContribuicoesComponent,
    ImportarContribuicoesComponent,
    MinhasContribuicoesComponent,
    SortDirective,
    UnauthorizedComponent,
    AlterarSenhaComponent,
    VincularMoradorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    appRoutingModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    ModalModule,
  ],
  providers: [
    MoradorService,
    MoradoresService,
    ResidenciaService,
    ResidenciasService,
    VisitasService,
    VisitantesService,
    VeiculosService,
    CepService,
    ModulosService,
    AcessoFuncionalidadeService,
    AcessoModuloService,
    FuncionalidadeService,
    ContribuicoesService,
    VincularMoradorService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
