import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import Alert from 'sweetalert2';

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
import { OrderService } from "services/order.service";

import { UserContext } from "contexts/UserContext/UserContext";
import { CartService } from "services/cart.service";

export const CartContext = createContext({} as IOrderContextValues);

export function CartProvider({ children }: any) {
    const { authenticated } = useContext(UserContext);

    const [order, setOrder] = useState<Order>(OrderInstance);
    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
        if (authenticated) getCart();
    }, []);

    async function getCart() {
        await CartService.get(1).then((response) => {
            if (response.length !== 0) {
                const _order = { ...order };
    
                response.map((cart, index) => {
                    _order.total_price += roundNumber(cart.price * cart.quantity);
                });

                setOrder(_order); 
                setCart(response);
            }

        });
    };

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

            saveCart(_cart[cartIndex]).then(() => {
                setCart(_cart);
            }).catch((err) => {
                console.log("~ error:", err)
            });

        } else {
            const cartProduct = new CartProduct({
                id_item_pedido: Math.random(),
                pedido: null,
                produto: new ProductPT(product),
                quantidade: quantity,
                preco: roundNumber(product.price * quantity),
                usuario: 1 // id fixo temporário 
            });

            saveCart(cartProduct).then(() => {
                setCart(cart => [...cart, cartProduct]);
            }).catch((err) => {
                console.log("~ error:", err.response)
            });
        };

        _order.total_price += roundNumber(product.price * quantity);
        setOrder(_order);
    };

    async function saveCart(cartProduct: CartProduct) {
        return await CartService.create(cartProduct);
    }

    function removeFromCart(cartProduct: CartProduct) {
        if (cart.length === 1) {
            Alert.fire({
                title: 'Aviso',
                text: 'Esse é o último produto do carrinho. Tem certeza que deseja removê-lo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "<span style='color: #1b1b1b'>Sim</span>",
                confirmButtonColor: "#FFBF00",
                cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
                cancelButtonColor: "transparent",
            }).then((result) => {
                if (result.isConfirmed) saveRemoveChanges(cartProduct);
            });
        } else {
            saveRemoveChanges(cartProduct)
        }
    };

    async function saveRemoveChanges(cartProduct: CartProduct) {
        await CartService.remove(cartProduct).then(() => {
            setCart(cart => {
                return cart.filter(function(cartItem) {
                    return cartItem !== cartProduct;
                });
            });
    
            setOrder(orderInfo => {
                let _order = { ...orderInfo };
    
                if (cart.length === 1) {
                    _order = OrderInstance;
                } else {
                    _order.total_price = orderInfo.total_price - (cartProduct.product.price * cartProduct.quantity);
                }
    
                return _order;
            });
        });
    }

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

    async function finishOrder() {
        await OrderService.create(order).then(() => {
            setCart([]);
            setOrder(order => {
                let _order = { ...order };
                _order = OrderInstance;

                return _order;
            });
        });
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
