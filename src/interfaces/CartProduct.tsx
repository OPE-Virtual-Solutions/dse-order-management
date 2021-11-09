import { Product, ProductPT } from "./Product";

export interface CartProductPost {
    product: number;
    order: any;
    quantity: number;
    user: number;
}

export class CartProductPT {
    // id_item_pedido?: number;
    // produto: ProductPT;
    // pedido: any;
    // quantidade: number;
    // preco: number;
    // usuario: number;

    // constructor(cartProduct: CartProduct) {
    //     this.id_item_pedido = cartProduct.id;
    //     this.produto = new ProductPT(cartProduct.product);
    //     this.pedido = cartProduct.order;
    //     this.quantidade = cartProduct.quantity;
    //     this.preco = cartProduct.price;
    //     this.usuario = cartProduct.user;
    // }
};

export class CartProduct {
    id?: number;
    product: Product;
    order: any;
    quantity: number;
    price: number;
    user: any;

    constructor({
        id = null,
        product,
        order,
        quantity,
        price,
        user
    }: any) {
        if (id) this.id = id;
        this.product = product;
        this.order = order;
        this.quantity = quantity;
        this.price = price;
        this.user = user;
    };

    public changeQuantity(quantity: number) {
        this.quantity = quantity;
    };

    public addQuantity() {
        this.quantity++;
    };

    public subtractQuantity() {
        this.quantity--;
    };
};