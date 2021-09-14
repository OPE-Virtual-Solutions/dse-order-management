import { api } from "api";
import axios from "axios";

import { 
    ICategoria, 
    IIngrediente,
    IProduto
} from "interfaces";
import { ICreateProduto } from "interfaces/IProduto";

import { Endpoints } from "./Endpoints";

const ENDPOINT = "/produtos/";

// Service/Controller de Produtos
class Service {
    produtos: IProduto[] = []
    categorias: ICategoria[] = []
    ingredientes: IIngrediente[] = []

    async list() {
        const productList = await api.get(Endpoints.product);

        return productList.data;
    }

    async create(produto: ICreateProduto) {
        const response = await api.post(ENDPOINT, produto);

        return response.data;
    }

    async getRelated() {
        await axios.all([
            api.get(Endpoints.product),
            api.get(Endpoints.category),
            api.get(Endpoints.ingredients)
        ]).then(axios.spread((produtos, categorias, ingredientes) => {
            this.produtos = produtos.data;
            this.categorias = categorias.data;
            this.ingredientes = ingredientes.data;
        }));
        
        return {
            produtos: this.produtos,
            categorias: this.categorias,
            ingredientes: this.ingredientes
        }
    }

    async update(id: number, produto: ICreateProduto) {
        const response = await api.patch(ENDPOINT + `${id}/`, produto).catch((error) => { return error.response });
        
        return response;
    }
};

export const ProductService = new Service();