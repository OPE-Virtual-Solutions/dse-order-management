import { api } from "api";
import axios from "axios";

import { Category } from "interfaces/Category";
import { Ingredient, IngredientPT } from "interfaces/Ingredient";

import {
    Product,
    ProductPT,
    ProductPostPT,
    ProductPost
} from "interfaces/Product";
import { CategoryService } from "./category.service";
import { IngredientService } from "./ingredient.service";

enum Endpoints {
    product = "/produtos/",
    category = "/categorias/",
    ingredient = "/ingredientes/"
};

class _ProductService {
    products: Product[] = [];
    ingredients: Ingredient[] = [];
    categories: Category[] = [];

    async list(): Promise<Product[] | undefined> {
        const response = await api.get(Endpoints.product);

        if (response.status) {
            const list: Product[] = response.data.results;
            return list;
        };

        return undefined;
    };

    async create(product: Product, ingredients: Ingredient[]) {
        const _product: ProductPost = {
            name: product.name,
            category: product.category.id ? product.category.id : 1,
            active: product.active,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        };

        const post = {
            ..._product,
            ingredients: ingredients
        }

        const response = await api.post(Endpoints.product, post);
        
        return response;
    };

    async update(id: number, product: Product) {

        const produto: ProductPost = {
            name: product.name,
            category: product.category.id ? product.category.id : 1,
            active: product.active,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        }

        const response = await api.patch(Endpoints.product + `${id}/`, produto);
    
        return response;
    };

    async getProductRelatedInfo() {
        await axios.all([
            api.get(Endpoints.product),
            api.get(Endpoints.category),
            api.get(Endpoints.ingredient)
        ]).then(axios.spread((products, categories, ingredients) => {
            this.products = products.data.results;
            this.categories = categories.data.results;
            this.ingredients = ingredients.data.results;
        }));

        return {
            products: this.products,
            categories: this.categories,
            ingredients: this.ingredients
        }
    }

};

export const ProductService = new _ProductService();