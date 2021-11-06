import { 
    CartProduct, 
    Product,
    Order
} from "interfaces";

interface IOrderContextValues {
    cart: CartProduct[];
    order: Order;
    addToCart: (product: Product, quantity: number, userId: number) => void;
    removeFromCart: (cartProduct: CartProduct) => void;
    sumItemQuantity: (cartProduct: CartProduct) => void;
    subtractItemQuantity: (cartProduct: CartProduct) => void;
    updateOrderInfo: (orderInfo: Order) => void;
    finishOrder: () => void;
}

export type {
    IOrderContextValues
}

export const OrderInstance: Order = {
    status: "",
    is_local_order: true,
    total_payed: 0,
    total_price: 0,
};