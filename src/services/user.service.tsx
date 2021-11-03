import { api } from "api";

import { User, UserPT } from "interfaces/User";

class _UserService {
    private translateListResponse(response: UserPT[]) {
        return response.map((usuario: UserPT) => {
            return new User(usuario);
        });
    }

    async list() {
        const response = await api.get("/usuarios/");

        let list: User[] = [];
        
        if (response.status) {
            list = this.translateListResponse(response.data.results);
        }

        return list;
    }
}

export const UserService = new _UserService();