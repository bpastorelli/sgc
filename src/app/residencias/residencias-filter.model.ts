export class ResidenciasFilterModel{

  id?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  posicao?: number;
  content: boolean;
  sort?: string = 'endereco';
  page: number;
  size: number;
  direction: string;
  detalhaMorador: boolean;
  guide: string;

}
