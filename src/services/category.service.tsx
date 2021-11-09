import { api } from "api";

import { 
    Category, 
    CategoryPT 
} from "interfaces/Category";

const ENDPOINT = "/categorias/";

class _CategoryService {
    async list() {
        const response = await api.get(ENDPOINT);

        if (response.status) {
            const list = response.data.results;

            return list;
        }

        return undefined;
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