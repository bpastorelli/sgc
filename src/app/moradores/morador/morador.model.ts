import { Residencia } from "src/app/residencias/residencias.model";

export interface Morador {

    id: string;
    nome: string;
    cpf: string;
    rg: string;
    email: string;
    senha: string;
    perfil: string;
    telefone: string;
    celular: string;
    residenciaId: string;
    dataAtualizacao: Date;
    dataCriacao: Date;
    posicao: number;
    associado: number;
    residencias: Residencia[];
    guide: string;

}
