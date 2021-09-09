import { IIngrediente } from "interfaces";

interface ICategoria {
    id: number;
    nome: string;
    ativo: boolean;
}

export interface IProduto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    ativo: boolean;
    categoria: ICategoria;
    ingredientes: IIngrediente[]; 
}

export const emptyProduct: IProduto = {
    id: 0,
    nome: "",
    preco: 0,
    descricao: "",
    quantidade: 0,
    ativo: false,
    categoria: {
        id: 0,
        nome: "",
        ativo: false
    },
    ingredientes: []
}