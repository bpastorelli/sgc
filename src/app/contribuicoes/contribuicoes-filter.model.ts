export class ContribuicoesFilterModel{

  id?: number;
  moradorId: string;
  nome: string;
  rg: string;
  cpf: string;
  dataInicio: string;
  dataFim: string;
  posicao?: number;
  content: boolean;
  sort?: string;
  page: number;
  size: number;
  direction: string;

}
