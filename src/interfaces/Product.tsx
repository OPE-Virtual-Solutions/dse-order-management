import { Category, CategoryPT, Ingredient } from "interfaces";

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

type ProductConstructor = {
    id?: number; 
    name: string;
    price: number;
    description: string;
    quantity: number;
    active: boolean;
    category: Category;
    ingredients?: any;
}

export interface ProductPost {
    name: string;
    category: number;
    active: boolean,
    description: string;
    price: number;
    quantity: number;
}

export class Product {
    id: number; 
    name: string;
    price: number;
    description: string;
    quantity: number;
    active: boolean;
    category: Category;
    ingredients: Ingredient[];

    constructor({
        id = -1,
        name,
        price,
        description,
        quantity,
        active,
        category,
        ingredients
    }: ProductConstructor) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.active = active;
        this.category = {
            id: category.id,
            name: category.name,
            active: category.active,
        };
        this.ingredients = ingredients;
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
    active: false,
    ingredients: [],
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