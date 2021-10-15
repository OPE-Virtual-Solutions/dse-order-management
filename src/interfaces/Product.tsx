export class Product {
    id?: number; 
    name: string;
    price: number;
    description: string;
    quantity: number;
    active: boolean;
    category: string;
    ingredients?: any;

    constructor(produto: ProductPT) {
        this.id = produto.id_produto;
        this.name = produto.nome_produto;
        this.price = produto.preco;
        this.description = produto.descricao;
        this.quantity = produto.quantidade || 0;
        this.active = produto.ativo;
        this.category = produto.categoria;
        this.ingredients = produto.ingredientes;
    };
};

export class ProductPT {
    id_produto?: number;
    nome_produto: string;
    preco: number;
    descricao: string;
    ativo: boolean;
    categoria: string;
    quantidade?: number;
    ingredientes?: any;

    constructor(product: Product) {
        this.id_produto = product.id;
        this.nome_produto = product.name;
        this.preco = product.price;
        this.descricao = product.description;
        this.ativo = product.active;
        this.categoria = product.category;
        this.quantidade = product.quantity;
        this.ingredientes = product.ingredients;
    }
}