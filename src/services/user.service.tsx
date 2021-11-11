import { api } from "api";

import { User, UserPost } from "interfaces/User";

type UserTypeParam = "funcionario" | "cliente";

class _UserService {
    formatResponse(userList: any[]) {
        return userList.map((user) => {
            return new User(user);
        })
    }

    async list(type: UserTypeParam | undefined = undefined) {
        const response = await api.get("/usuarios/", {
            params: {
                tipo: type
            }
        });

        let list: User[] = [];
        
        if (response.status) {
            list = this.formatResponse(response.data.results);
        }

        return list;
    }

    async create(user: User) {
        return await api.post("/register/", user);
    }

    async update(user: User) {
        return await api.patch(`/usuarios/${user.id}/`, user)
    }
}

export const UserService = new _UserService();