import { CartProduct } from "interfaces";
import { CartService } from "services/cart.service";

type OrderPost = {
    codigo_pedido?: string;
    atendimento_presencial: boolean;
    valor_total: number;
    status: string;
    metodo_pagamento?: string;
    criado_em?: Date;
    tipo_pedido: string;
}

export type OrderPostPT = {
    usuario: number;
    pedido: OrderPost;
}

export class Order {
    id: number;

    orderCode?: string;
    type?: string;
    isLocalOrder: boolean;

    totalPrice: number;
    totalPayed?: number;

    status: string;

    paymentMethod?: string;

    address?: number;
    costumer?: number;

    createdAt: Date;
    finishedAt?: Date;

    note?: string;
    cancelNote?: string;

    employee?: number;

    products?: CartProduct[];

    constructor({
        id = -1,
        orderCode,
        isLocalOrder,
        type,
        totalPrice,
        status,
        paymentMethod,
        createdAt,
        note
    }: any) {
        this.id = id;
        this.orderCode = orderCode;
        this.isLocalOrder = isLocalOrder;
        this.type = type;
        this.totalPrice = totalPrice;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.createdAt = createdAt;
        this.note = note;
    }
}

export class OrderPT {
    // id_pedido?: number;

    // codigo_pedido?: string;
    // tipo_pedido?: string;
    // atendimento_presencial: boolean;

    // valor_total: number;
    // valor_pago: number;

    // status: string;

    // metodo_pagamento?: string;

    // endereco?: number;
    // cliente?: number;

    // criado_em?: Date;
    // finalizado_em?: Date;

    // observacao?: string;

    // funcionario?: number;

    // produtos?: any;

    // constructor(order: Order) {
    //     this.id_pedido = order.id;

    //     this.codigo_pedido = order.order_code;
    //     this.tipo_pedido = order.order_type;
    //     this.atendimento_presencial = order.is_local_order;

    //     this.valor_total = order.total_price;
    //     this.valor_pago = order.total_payed;

    //     this.status = order.status;

    //     this.metodo_pagamento = order.payment_method;

    //     this.endereco = order.address;
    //     this.cliente = order.costumer;

    //     this.criado_em = order.created_at;
    //     this.finalizado_em = order.finished_at;

    //     this.funcionario = order.employee;

    //     this.observacao = order.note;

    //     this.produtos = order.products;
    // }
}
