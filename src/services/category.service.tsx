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
            const list = response.data.map((categoria: CategoryPT) => {
                return new Category(categoria);
            });

            return list;
        }

        return undefined;
    };
};

export const CategoryService = new _CategoryService();