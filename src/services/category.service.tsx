import { api } from "api";

import { 
    Category, 
    CategoryPT 
} from "interfaces/Category";

const ENDPOINT = "/categorias/";

class _CategoryService {
    async list() {
        const response = await api.get(ENDPOINT);

        let list = [];
        if (response.status) {
            list = response.data;
        }

        return list;
    };

    async create(category: Category) {
        const response = await api.post(ENDPOINT, category);

        return response;
    };

    async update(category: Category) {
        const id = category.id;

        const response = await api.patch(ENDPOINT + `${id}/`, category);

        return response;
    };
};

export const CategoryService = new _CategoryService();