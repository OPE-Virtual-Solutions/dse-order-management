import { api } from "api";

import { CartProduct, CartProductPT } from "interfaces";
import { CartProductPost } from "interfaces/CartProduct";

const ENDPOINT = "/itensPedidos/";

class _CartService {
    translateListResponse(response: CartProductPT[]) {
        return response.map((carrinho: CartProductPT) => {
            return new CartProduct(carrinho);
        });
    }

    async get(userId: number) {
        const response = await api.get(ENDPOINT, {
            params: {
                user: userId
            }
        });

        let list: CartProduct[] = [];
        if (response.status) {
            list = this.translateListResponse(response.data);
        };

        return list;
    };

    async create(cartProduct: CartProduct) {
        const item: CartProductPost = {
            pedido: cartProduct.order,
            produto: cartProduct.product.id || 0,
            quantidade: cartProduct.quantity,
            usuario: cartProduct.user
        }

        await api.post(ENDPOINT, item);
    };

    async remove(cartProduct: CartProduct) {
        await api.delete(`${ENDPOINT}${cartProduct.id}/`);
    }
}

export const CartService = new _CartService();