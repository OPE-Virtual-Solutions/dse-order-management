import {
    createContext,
    useState,
} from "react";

import { 
    CartProduct, 
    Product,
    ProductPT,
    Order
} from "interfaces";
import { roundNumber } from "utils/roundNumbers";

import { 
    IOrderContextValues,
    OrderInstance
} from "./ICartContext";

export const CartContext = createContext({} as IOrderContextValues);

export function CartProvider({ children }: any) {
    const [order, setOrder] = useState<Order>(OrderInstance);
    const [cart, setCart] = useState<CartProduct[]>([]);

    function getProductIndex(product: Product): number {
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].product === product) return index;
        };

        return -1;
    }

    function addToCart(product: Product, quantity: number) {
        const cartIndex = getProductIndex(product);
        const _order = { ...order };

        if (cartIndex !== -1) {
            const _cart = { ...cart };
            
            _cart[cartIndex].addQuantity();
            
            setCart(_cart);
        } else {
            const cartProduct = new CartProduct({
                id_item_pedido: Math.random(),
                pedido: null,
                produto: new ProductPT(product),
                quantidade: quantity,
                preco: roundNumber(product.price * quantity)
            });

            setCart(cart => [...cart, cartProduct]);
        };

        _order.total_price += roundNumber(product.price * quantity);
        setOrder(_order);
    };

    function removeFromCart(cartProduct: CartProduct) {
        setCart(cart => {
            return cart.filter(function(cartItem) {
                return cartItem !== cartProduct;
            });
        });

        setOrder(orderInfo => {
            let _order = { ...orderInfo };
            _order.total_price = orderInfo.total_price - (cartProduct.product.price * cartProduct.quantity);

            return _order;
        });
    };

    function sumItemQuantity(cartProduct: CartProduct) {
        const _cart = cart.map(cartItem => {
            if (cartItem.id === cartProduct.id) {
                cartItem.addQuantity();

                setOrder(orderInfo => {
                    let summary = { ...orderInfo };

                    summary.total_price = orderInfo.total_price + cartItem.product.price;

                    return summary;
                });
            }

            return cartItem;
        });

        setCart(_cart);
    }

    function subtractItemQuantity(cartProduct: CartProduct) {
        const _cart = cart.map(cartItem => {
            if (cartItem.id === cartProduct.id) {
                cartItem.subtractQuantity();

                setOrder(orderInfo => {
                    let summary = { ...orderInfo };

                    summary.total_price = orderInfo.total_price - cartItem.product.price;

                    return summary;
                });
            }

            return cartItem;
        });

        setCart(_cart);
    }

    function updateOrderInfo(orderInfo: Order) { 
        setOrder(order => {
            let _order = { ...order };
            _order = orderInfo;

            return _order;
        });
    }

    function finishOrder() {
        console.log("[LOG] ~ file: CartContext.tsx ~ line 23 ~ CartProvider ~ order", order);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                order,
                addToCart,
                removeFromCart,
                sumItemQuantity,
                subtractItemQuantity,
                updateOrderInfo,
                finishOrder
            }}
        >
            { children }
        </CartContext.Provider>
    )
};
