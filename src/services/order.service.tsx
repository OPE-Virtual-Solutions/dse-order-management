import { api } from "api";

import { 
    Order,
    OrderPostPT
} from "interfaces";

const ENDPOINT = "/pedidos/";

class _OrderService {
    async create(order: Order) {
        const pedido: OrderPostPT = {
            codigo_pedido: order.order_code,
            status: "em_espera",
            atendimento_presencial: order.is_local_order,
            valor_total: order.total_price,
            metodo_pagamento: order.payment_method,
            criado_em: new Date()
        };

        const response = await api.post(ENDPOINT, pedido);

        return response;
    }
};

export const OrderService = new _OrderService();