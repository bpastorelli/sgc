import { AcessoFuncionalidade } from "./acessoFuncionalidade";

export class AcessoModulo {
  id: string;
  idModulo: string;
  descricao: string;
  path: string;
  acesso: boolean;
  funcionalidades: AcessoFuncionalidade[];
}
