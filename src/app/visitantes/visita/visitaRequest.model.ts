import { VeiculoVisita } from "../visita/veiculoVisita.model";

export interface VisitaRequest{

  rg: string,
  residenciaId: string,
  placa: string,
  veiculoVisita: VeiculoVisita

}
