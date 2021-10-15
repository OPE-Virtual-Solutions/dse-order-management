import { api } from "api";

import { 
    Ingredient,
    IngredientPT
} from "interfaces/Ingredient";

const ENDPOINT = "/ingredientes/";

class _IngredientService {
    async list(): Promise<Ingredient[] | undefined> {
        const response = await api.get(ENDPOINT);

        if (response.status) {
            const list: Ingredient[] = response.data.map((ingredient: IngredientPT) => {
                return new Ingredient(ingredient);
            });

            return list;
        };

        return undefined;
    };
};

export const IngredientService = new _IngredientService();