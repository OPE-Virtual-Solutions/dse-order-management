import { api } from "api";

import { User, UserPost, UserPT } from "interfaces/User";

type UserTypeParam = "funcionario" | "cliente";

class _UserService {
    private translateListResponse(response: UserPT[]) {
        return response.map((usuario: UserPT) => {
            return new User(usuario);
        });
    }

    async list(type: UserTypeParam | undefined = undefined) {
        const response = await api.get("/usuarios/", {
            params: {
                tipo: type
            }
        });

        let list: User[] = [];
        
        if (response.status) {
            list = this.translateListResponse(response.data.results);
        }

        return list;
    }

    async create(user: UserPost) {
        return await api.post("/register/", user);
    }

    async update(user: User) {
        const usuario = new UserPT(user);

        return await api.patch(`/usuarios/${user.id}/`, usuario)
    }
}

export const UserService = new _UserService();