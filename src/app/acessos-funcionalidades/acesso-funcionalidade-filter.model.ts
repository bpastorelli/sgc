export class AcessoFuncionalidadeFilter{

  idUsuario?: string;
  idModulo?: string[];
  idFuncionalidade?: string[];
  posicao?: number = 1;
  acesso: boolean = true;
  content: boolean = true;
  sort?: string = 'nomeFuncionalidade';
  page: number = 0;
  size: number = 1000000;
  direction: string;

}
