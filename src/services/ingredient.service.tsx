import { api } from "api";

import { 
    Ingredient,
    IngredientPT
} from "interfaces/Ingredient";

const ENDPOINT = "/ingredientes/";

class _IngredientService {
    translateListResponse(response: IngredientPT[]) {
        return response.map((ingrediente: IngredientPT) => {
            return new Ingredient(ingrediente);
        });
    }

    async list() {
        const response = await api.get(ENDPOINT);

        let list: Ingredient[] = [];
        if (response.status) {
            list = this.translateListResponse(response.data.results);
        };

        return list;
    };

    async create(ingredient: Ingredient) {
        const ingrediente = new IngredientPT(ingredient);

        const response = await api.post(ENDPOINT, ingrediente);
        
        return response;
    };

    async update(id: number, ingredient: Ingredient) {
        const ingrediente = new IngredientPT(ingredient);

        const response = await api.patch(ENDPOINT + `${id}/`, ingrediente);
    
        return response;
    };
};

export const IngredientService = new _IngredientService();