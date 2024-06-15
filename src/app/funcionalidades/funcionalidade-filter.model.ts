export class FuncionalidadeFilter {

  id?: string;
  idModulo?: string;
  descricao?: string;
  funcao?: string;
  pathFuncionalidade?: string;
  posicao?: number;
  content?: boolean = true;
  sort: string = 'descricao';
  page: number = 0;
  size: number = 1000000;
  direction: string;

}
