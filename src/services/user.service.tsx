import { api } from "api";

import { User, UserPost } from "interfaces/User";

type UserTypeParam = "funcionario" | "cliente";

class _UserService {
    formatResponse(userList: any[]) {
        return userList.map((user) => {
            return new User(user);
        })
    }

    async listByPage(type: UserTypeParam | undefined = undefined, pageNumber: number, name: string = "") {
        const response = await api.get("/usuarios/", {
            params: {
                tipo: type,
                page: pageNumber,
                name: name
            }
        });

        let list: User[] = [];
        if (response.status) {
            list = this.formatResponse(response.data.results);
        };

        let count: number = 0;
        if (pageNumber === 1) count = response.data.count;

        return { list, count };
    }

    async list(type: UserTypeParam | undefined = undefined, name: string = "") {
        const response = await api.get("/usuarios/", {
            params: {
                tipo: type,
                name: name
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