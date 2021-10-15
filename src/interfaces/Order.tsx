enum EnumPaymentMethods {
    money = "dinheiro",
    credit = "credito",
    debit = "debito"
}

enum EnumOrderType {
    toEat = "local",
    toGo = "viagem"
}

enum EnumOrderStatus {
    waiting = "aguardando",
    onGoing = "em_andamento",
    done = "concluido",
    finished = "despachado"
}

export class Order {
    id?: number;

    order_code?: string;
    order_type?: string;
    is_local_order: boolean;

    total_price: number;
    total_payed: number;

    status: string;

    payment_method?: string;

    address?: number;
    costumer?: number;

    created_at?: Date;
    finished_at?: Date;

    employee?: Date;

    constructor(pedido: OrderPT) {

        this.id = pedido.id_pedido;

        this.order_code = pedido.codigo_pedido;
        this.order_type = pedido.tipo_consumo;
        this.is_local_order = pedido.atendimento_presencial;

        this.total_price = pedido.valor_total;
        this.total_payed = pedido.valor_pago;

        this.status = pedido.status;

        this.payment_method = pedido.metodo_pagamento;

        this.address = pedido.endereco;
        this.costumer = pedido.cliente;

        this.created_at = pedido.criado_em;
        this.finished_at = pedido.finalizado_em;

        this.employee = pedido.funcionario;
    }
}

export class OrderPT {
    id_pedido?: number;

    codigo_pedido?: string;
    tipo_consumo?: string;
    atendimento_presencial: boolean;

    valor_total: number;
    valor_pago: number;

    status: string;

    metodo_pagamento?: string;

    endereco?: number;
    cliente?: number;

    criado_em?: Date;
    finalizado_em?: Date;

    funcionario?: Date;

    constructor(order: Order) {
        this.id_pedido = order.id;

        this.codigo_pedido = order.order_code;
        this.tipo_consumo = order.order_type;
        this.atendimento_presencial = order.is_local_order;

        this.valor_total = order.total_price;
        this.valor_pago = order.total_payed;

        this.status = order.status;

        this.metodo_pagamento = order.payment_method;

        this.endereco = order.address;
        this.cliente = order.costumer;

        this.criado_em = order.created_at;
        this.finalizado_em = order.finished_at;

        this.funcionario = order.employee;
    }
}
