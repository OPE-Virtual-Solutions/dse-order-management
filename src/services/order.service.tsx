import { api } from "api";

import { 
    Order,
    OrderPT,
    OrderPostPT
} from "interfaces";

const ENDPOINT = "/pedidos/";

class _OrderService {

    private translateListResponse(response: OrderPT[]) {
        return response.map((pedido: OrderPT) => {
            return new Order(pedido);
        });
    }

    async list() {
        const response = await api.get(ENDPOINT);

        let list: Order [] = [];
        if (response.status) {
            console.log("~ lista de pedidos:", response.data);
            list = this.translateListResponse(response.data);
            console.log("~ lista de pedidos convertida:", list);
        };

        return list;
    };

    async create(order: Order) {
        const pedido: OrderPostPT = {
            codigo_pedido: order.order_code,
            status: "aguardando",
            atendimento_presencial: order.is_local_order,
            valor_total: order.total_price,
            metodo_pagamento: order.payment_method,
            criado_em: new Date(),
            tipo_pedido: order.order_type || "pra_consumir"
        };

        const response = await api.post(ENDPOINT, pedido);

        return response;
    };

    async update(id: number, order: Order) {
        const pedido = new OrderPT(order);

        const response = await api.patch(ENDPOINT + `${id}/`, pedido);
    
        return response;
    };
};

export const OrderService = new _OrderService();