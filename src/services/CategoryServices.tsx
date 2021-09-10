import { api } from "api";
import { Endpoints } from "./Endpoints";

class Service {
    async list () {
        const categoryList = await api.get(Endpoints.category);
        
        return categoryList.data;
    }
}

export const CategoryService = new Service();