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
        if (response.status) list = response.data.results;

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

    formatPaymentMethod(method: string) {
        switch (method) {
            case "money":
                return "dinheiro"
            case "credit":
                return "cartão de crédito"
            case "debit":
                return "cartão de débito"
            default:
                return "dinheiro"
        }
    };
    
    formatStatus(status: string) {
        switch (status) {
            case "aguardando": 
                return "Aguardando inicio do preparo";
            case "em_andamento":
                return "Em andamento";
            case "pronto":
                return "Pronto para despache";
            case "finalizado":
                return "Finalizado"
            case "cancelado":
                return "Cancelado"
            default:
                return "Em andamento"
        }
    };
};

export const OrderService = new _OrderService();