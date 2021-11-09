import { api } from "api";

import { 
    Order,
    OrderPT,
    OrderPostPT
} from "interfaces";

const ENDPOINT = "/pedidos/";

class _OrderService {
    async list() {
        const response = await api.get(ENDPOINT + "?apenasAtendimento=true");

        let list: Order [] = [];
        if (response.status) {
            list = response.data;
        };

        return list;
    };

    async listAll() {
        const response = await api.get(ENDPOINT);

        let list: Order[] = [];
        if (response.status) list = response.data;

        return list;
    }

    async create(order: Order, userId: number) {
        const response = await api.post(ENDPOINT, {
            user: userId,
            order: order
        });

        return response;
    };

    async update(id: number, order: Order) {
        const response = await api.patch(ENDPOINT + `${id}/`, order);
    
        return response;
    };
};

export const OrderService = new _OrderService();