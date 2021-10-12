import { IProduto } from "interfaces";

export interface IItemPedido {
    id: number;
    produto: IProduto;
    pedido: any;
    quantidade: number;
    preco: number;
}