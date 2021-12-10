import { api } from "api";

import { 
    Ingredient,
    IngredientPT
} from "interfaces/Ingredient";

const ENDPOINT = "/ingredientes/";

class _IngredientService {
    async list(paginated: boolean = false) {
        const response = await api.get(ENDPOINT, { 
            params: {
                paginated: paginated
            }
        });

        let list: Ingredient[] = [];
        if (response.status) {

            paginated ? list = response.data.results : list = response.data;
        };

        return list;
    };

    async listByPage(pageNumber: number, name: string = "") {
        const response = await api.get(ENDPOINT, {
            params: {
                page: pageNumber,
                name: name
            }
        });

        let list: Ingredient[] = [];
        if (response.status) {
            list = response.data.results;
        };

        let count: number = 0;
        if (pageNumber === 1) count = response.data.count;

        return { list, count };
    }
    
    async create(ingredient: Ingredient) {
        const response = await api.post(ENDPOINT, ingredient);
        
        return response;
    };

    async update(id: number, ingredient: Ingredient) {
        const response = await api.patch(ENDPOINT + `${id}/`, ingredient);
    
        return response;
    };
};

export const IngredientService = new _IngredientService();