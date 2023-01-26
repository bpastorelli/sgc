export class ModulosFilterModel{

  id?: string;
  descricao?: string;
  path?: string;
  posicao?: number;
  content: boolean = true;
  sort?: string = 'descricao';
  page: number = 0;
  size: number = 1000000;
  direction: string;

}
