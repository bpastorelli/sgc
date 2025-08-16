import { Paginacao } from "src/app/_models/paginacao";
import { Residencia } from "./residencias.model";

export interface ResidenciasPaginadoResponse{

    residencias: Residencia[],
    
    paginacao: Paginacao

}
