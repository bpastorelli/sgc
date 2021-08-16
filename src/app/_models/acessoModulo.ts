import { AcessoFuncionalidade } from "./acessoFuncionalidade";

export class AcessoModulo {
  id: number;
  idModulo: number;
  descricao: string;
  path: string;
  acesso: boolean;
  funcionalidades: AcessoFuncionalidade[];
}
