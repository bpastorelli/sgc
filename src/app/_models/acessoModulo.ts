import { AcessoFuncionalidade } from "./acessoFuncionalidade";

export class AcessoModulo {
  id: string;
  idUsuario: string;
  idModulo: string;
  nomeModulo: string;
  pathModulo: string;
  acesso: boolean;
  funcionalidades: AcessoFuncionalidade[];
}
