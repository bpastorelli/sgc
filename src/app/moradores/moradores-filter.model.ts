export class MoradoresFilterModel{

  nome?: string;
  cpf?: string;
  rg?: string;
  email?: string;
  posicao?: number;
  content: boolean = true;
  sort?: string = 'nome';
  page: number = 0;
  size: number = 1000000;
  direction: string;

}
