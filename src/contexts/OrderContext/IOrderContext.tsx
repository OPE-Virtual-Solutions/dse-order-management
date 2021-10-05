import { ReactNode } from "react";

import { 
    IItemPedido, 
    IPedido, 
    IProduto 
} from "interfaces";

interface IContextValues {
    addToCart: (produto: IProduto, quantity: number) => void;
    removeFromCart: (orderItem: IItemPedido) => void;
    sumProductQuantity: (orderItem: IItemPedido) => void;
    subtractProductQuantity: (orderItem: IItemPedido) => void;
    cart: IItemPedido[];
    summary: IPedido;
}

interface IProviderProps {
    children: ReactNode;
}

interface IProductInCartResponse {
    status: boolean;
    index: number;
}

export type {
    IContextValues,
    IProviderProps,
    IProductInCartResponse
}

export const EmptyOrder: IPedido = {
    atendimento_presencial: true,
    status: "",
    metodo_pagamento: "",
    valor_total: 0
}