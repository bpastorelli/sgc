export class PerfilFuncionalidadeRequest {

  public idFuncionalidade: string;
  public idModulo: string;
  public acesso: boolean;
  public inclusao: boolean;
  public alteracao: boolean;
  public exclusao: boolean;

}

const perfilFuncionalidadeRequest: PerfilFuncionalidadeRequest = new PerfilFuncionalidadeRequest();
