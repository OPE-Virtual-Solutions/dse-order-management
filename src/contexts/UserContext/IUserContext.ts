
import { User } from "interfaces/User"

export const UserInstance: User = new User({
    id_usuario: -1,
    email: "",
    nome_usuario: "",
    senha: "",
    tipo: ""
});

export type IContextValues = {
    user: User;
    authenticated: boolean;
    login: (credentials: ICredentials) => Promise<boolean>;
    logout: () => void;
}

export type ICredentials = {
    username: string;
    password: string;
}

export type IToken = {
    expiry: string;
    token: string;
}