import { api } from "api";
import axios from "axios";

import { Category } from "interfaces/Category";
import { Ingredient, IngredientPT } from "interfaces/Ingredient";

import {
    Product,
    ProductPT,
    ProductPostPT
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

    translateListResponse(response: ProductPT[]) {
        return response.map((produto: ProductPT) => {
            return new Product(produto);
        });
    }

    async list(): Promise<Product[] | undefined> {
        const response = await api.get(Endpoints.product);

        if (response.status) {
            const list: Product[] = this.translateListResponse(response.data.results);
            return list;
        };

        return undefined;
    };

    async create(product: Product, ingredients: Ingredient[]) {
        const produto: ProductPostPT = {
            nome_produto: product.name,
            categoria: product.category.id ? product.category.id : 1,
            ativo: product.active,
            descricao: product.description,
            preco: product.price,
            quantidade: product.quantity
        };

        const ingredientes: IngredientPT[] = ingredients.map((ingredient) => new IngredientPT(ingredient));

        const post = {
            ...produto,
            ingredientes: ingredientes
        }

        const response = await api.post(Endpoints.product, post);
        
        return response;
    };

    async update(id: number, product: Product) {

        const produto: ProductPostPT = {
            id_produto: id,
            nome_produto: product.name,
            categoria: product.category.id || 1,
            ativo: product.active,
            descricao: product.description,
            preco: product.price,
            quantidade: product.quantity
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
            this.products = this.translateListResponse(products.data.results);
            this.categories = CategoryService.translateListResponse(categories.data.results);
            this.ingredients = IngredientService.translateListResponse(ingredients.data.results);
        }));

        return {
            products: this.products,
            categories: this.categories,
            ingredients: this.ingredients
        }
    }

};

export const ProductService = new _ProductService();