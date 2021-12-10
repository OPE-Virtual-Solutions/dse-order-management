import { 
    CartProduct, 
    Product,
    Order
} from "interfaces";

interface IOrderContextValues {
    cart: CartProduct[];
    order: Order;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (cartProduct: CartProduct) => void;
    sumItemQuantity: (cartProduct: CartProduct) => void;
    subtractItemQuantity: (cartProduct: CartProduct) => void;
    updateOrderInfo: (orderInfo: Order) => void;
    finishOrder: () => void;
    sending: boolean;
}

export type {
    IOrderContextValues
}

export const OrderInstance: Order = {
    status: "aguardando",
    isLocalOrder: true,
    totalPayed: 0,
    totalPrice: 0,
    id: -1,
    createdAt: new Date()
};