import { api } from "api";

import { 
    Category, 
    CategoryPT 
} from "interfaces/Category";

const ENDPOINT = "/categorias/";

class _CategoryService {
    translateListResponse(response: CategoryPT[]) {
        return response.map((categoria: CategoryPT) => {
            return new Category(categoria);
        });
    }

    async list() {
        const response = await api.get(ENDPOINT);

        if (response.status) {
            const list = this.translateListResponse(response.data);

            return list;
        }

        return undefined;
    };

    async create(category: Category) {
        const categoria: CategoryPT = {
            nome_categoria: category.name,
            ativo: category.active
        };

        const response = await api.post(ENDPOINT, categoria);

        return response;
    };

    async update(category: Category) {
        const id = category.id;
        const categoria: CategoryPT = {
            nome_categoria: category.name,
            ativo: category.active
        };

        const response = await api.patch(ENDPOINT + `${id}/`, categoria);

        return response;
    };
};

export const CategoryService = new _CategoryService();