import { api } from "api";

import { User, UserPT } from "interfaces/User";

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
}

export const UserService = new _UserService();