import { Visitante } from "../visitantes/visitante.model";

export class Veiculo{

  id: string;
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  ano: string;
  posicao: string;
  ticket: string
  ticketVisitante?: string;
  visitantes: Visitante[]

}
