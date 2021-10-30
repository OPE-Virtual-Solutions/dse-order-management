import { Product, ProductPT } from "./Product";

export interface CartProductPost {
    produto: number;
    pedido: any;
    quantidade: number;
    usuario: number;
}

export class CartProductPT {
    id_item_pedido?: number;
    produto: ProductPT;
    pedido: any;
    quantidade: number;
    preco: number;
    usuario: number;

    constructor(cartProduct: CartProduct) {
        this.id_item_pedido = cartProduct.id;
        this.produto = new ProductPT(cartProduct.product);
        this.pedido = cartProduct.order;
        this.quantidade = cartProduct.quantity;
        this.preco = cartProduct.price;
        this.usuario = cartProduct.user;
    }
};

export class CartProduct {
    id?: number;
    product: Product;
    order: any;
    quantity: number;
    price: number;
    user: number;

    constructor(itemPedido: CartProductPT) {
        this.id = itemPedido.id_item_pedido;
        this.product = new Product(itemPedido.produto);
        this.order = itemPedido.pedido;
        this.quantity = itemPedido.quantidade;
        this.price = itemPedido.preco;
        this.user = itemPedido.usuario;
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