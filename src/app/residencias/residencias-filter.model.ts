export class ResidenciasFilterModel{

  id?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  posicao?: number;
  content: boolean = true;
  sort?: string = 'endereco';
  page: number = 0;
  size: number = 1000000;
  direction: string;
  guide: string;

}
