import { api } from "api";
import { Endpoints } from "./Endpoints";

class Service {
    async list() {
        const ingredientList = await api.get(Endpoints.ingredients);

        return ingredientList.data;
    }
};

export const IngredientService = new Service();