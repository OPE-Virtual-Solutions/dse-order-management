import {
    createContext, 
    useState 
} from "react";

import { 
    IItemPedido, 
    IProduto,
    IPedido
} from "interfaces";

import {
    IContextValues,
    IProviderProps,
    IProductInCartResponse,
    EmptyOrder
} from "./IOrderContext";
import { roundNumber } from "utils/roundNumbers";

export const OrderContext = createContext({} as IContextValues);

export function OrderProvider({ children }: IProviderProps) {
    const [orderInfo, setOrderInfo] = useState<IPedido>(EmptyOrder);
    const [cart, setCart] = useState<IItemPedido[]>([]);

    function isProductInCart(produto: IProduto): IProductInCartResponse {
        for (let index = 0; index < cart.length; index++) {
            if (cart[index].produto === produto) return { status: true, index: index };
        };

        return { status: false, index: -1 };
    }

    function addToCart(produto: IProduto, quantity: number) {
        const cartChecker = isProductInCart(produto);
        const _orderInfo = orderInfo;

        if (cartChecker.status) {
            const _cart = cart; 

            _cart[cartChecker.index].quantidade += 1;
            _orderInfo.valor_total += produto.preco; 

            setCart(_cart);
        } else {
            const orderItem: IItemPedido = {
                id: Math.random() * (100 - 1) + 1,
                preco: roundNumber(produto.preco * quantity),
                quantidade: quantity,
                pedido: null,
                produto: produto
            };
            
            _orderInfo.valor_total += roundNumber(produto.preco * quantity); 

            setCart(cart => [...cart, orderItem]);
        };

        setOrderInfo(_orderInfo);
    };

    function removeFromCart(orderItem: IItemPedido) {
        const _orderInfo = orderInfo;

        _orderInfo.valor_total -= orderItem.preco;

        setCart(cart => {
            return cart.filter(function(item) {
                return item !== orderItem
            })
        });
        setOrderInfo(_orderInfo);
    };

    return (
        <OrderContext.Provider value={{
            addToCart,
            removeFromCart,
            cart,
            summary: orderInfo
        }}>
            { children }
        </OrderContext.Provider>
    )
};

