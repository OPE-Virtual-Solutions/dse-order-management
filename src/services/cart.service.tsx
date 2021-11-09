import { api } from "api";

import { CartProduct, CartProductPT } from "interfaces";
import { CartProductPost } from "interfaces/CartProduct";

const ENDPOINT = "/itensPedidos/";

class _CartService {
    async get(userId: number) {
        const response = await api.get(ENDPOINT, {
            params: {
                user: userId
            }
        });

        let list: CartProduct[] = [];
        if (response.status) {
            list = response.data;
        };

        return list;
    };

    async create(cartProduct: CartProduct) {
        const cart: CartProductPost = {
            order: cartProduct.order,
            product: cartProduct.product.id,
            quantity: cartProduct.quantity,
            user: cartProduct.user
        }

        await api.post(ENDPOINT, cart);
    };

    async remove(cartProduct: CartProduct) {
        await api.delete(`${ENDPOINT}${cartProduct.id}/`);
    }
}

export const CartService = new _CartService();