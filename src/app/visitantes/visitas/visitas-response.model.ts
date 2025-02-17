import { Paginacao } from "src/app/_models/paginacao";
import { Visita } from "./visitas.model";

export interface VisitasResponse{

    visitas: Visita[],
    
    paginacao: Paginacao

}