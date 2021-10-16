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

    async list(): Promise<Ingredient[] | undefined> {
        const response = await api.get(ENDPOINT);

        if (response.status) {
            const list: Ingredient[] = this.translateListResponse(response.data);
            return list;
        };

        return undefined;
    };
};

export const IngredientService = new _IngredientService();