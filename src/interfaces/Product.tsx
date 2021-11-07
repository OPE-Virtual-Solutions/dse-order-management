import { Category, CategoryPT } from "interfaces";
import { IngredientService } from "services/ingredient.service";


export interface ProductPost {
    name: string;
    price: number;
    description: string;
    quantity: number;
    active: boolean;
    category: number;
}

export interface ProductPostPT {
    id_produto?: number;
    nome_produto: string;
    preco: number;
    descricao: string;
    ativo: boolean;
    categoria: number;
    quantidade?: number;
}

export class Product {
    id?: number; 
    name: string;
    price: number;
    description: string;
    quantity: number;
    active: boolean;
    category: Category;
    ingredients?: any;

    constructor(produto: ProductPT) {
        this.id = produto.id_produto;
        this.name = produto.nome_produto;
        this.price = produto.preco;
        this.description = produto.descricao;
        this.quantity = produto.quantidade || 0;
        this.active = produto.ativo;
        this.category = {
            id: produto.categoria.id_categoria,
            name: produto.categoria.nome_categoria,
            active: produto.categoria.ativo,
        };
        this.ingredients = IngredientService.translateListResponse(produto.ingredientes);
    };
};

export const EmptyProduct: Product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    category: {
        id: -1,
        name: "",
        active: false
    },
    quantity: 0,
    active: false
}

export class ProductPT {
    id_produto?: number;
    nome_produto: string;
    preco: number;
    descricao: string;
    ativo: boolean;
    categoria: CategoryPT;
    quantidade?: number;
    ingredientes?: any;

    constructor(product: Product) {
        this.id_produto = product.id;
        this.nome_produto = product.name;
        this.preco = product.price;
        this.descricao = product.description;
        this.ativo = product.active;
        this.categoria = {
            id_categoria: product.category.id,
            nome_categoria: product.category.name,
            ativo: product.category.active
        };
        this.quantidade = product.quantity;
        this.ingredientes = product.ingredients;
    }
}