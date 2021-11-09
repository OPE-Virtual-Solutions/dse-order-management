import { api } from "api";

import { User, UserPost } from "interfaces/User";

type UserTypeParam = "funcionario" | "cliente";

class _UserService {
    async list(type: UserTypeParam | undefined = undefined) {
        const response = await api.get("/usuarios/", {
            params: {
                tipo: type
            }
        });

        let list: User[] = [];
        
        if (response.status) {
            list = response.data.results;
        }

        return list;
    }

    async create(user: User) {
        return await api.post("/register/", user);
    }

    async update(user: User) {
        // const usuario = new UserPT(user);

        return await api.patch(`/usuarios/${user.id}/`, user)
    }
}

export const UserService = new _UserService();