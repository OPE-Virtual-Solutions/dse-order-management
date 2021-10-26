import { api } from "api";

import { CartProduct, CartProductPT } from "interfaces";

const ENDPOINT = "/itensPedidos/";

class _CartService {
    private translateListResponse(response: CartProductPT[]) {
        return response.map((carrinho: CartProductPT) => {
            return new CartProduct(carrinho);
        });
    }

    async get(userId: number) {
        const response = await api.get(ENDPOINT, {
            params: {
                userId: userId
            }
        });

        let list: CartProduct[] = [];
        if (response.status) {
            list = this.translateListResponse(response.data);
        };

        return list;
    };
}

export const CartService = new _CartService();