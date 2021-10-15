import { api } from "api";

import {
    Product,
    ProductPT,
} from "interfaces/Product";

enum Endpoints {
    product = "/produtos/"
};

class _ProductService {
    async list(): Promise<Product | undefined> {
        const response = await api.get(Endpoints.product);

        if (response.status) {
            const productList = response.data.map((produto: ProductPT) => {
                return new Product(produto);
            });

            return productList;
        };

        return undefined;
    };

    async create(product: Product) {
        const produto = new ProductPT(product);

        const response = await api.post(Endpoints.product, produto);
        return response.data;
    };
};

export const NewProductService = new _ProductService();