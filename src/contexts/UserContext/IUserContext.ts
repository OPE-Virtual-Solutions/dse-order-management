
import { User } from "interfaces/User"

export const UserInstance: User = new User({
    id_usuario: -1,
    email: "",
    nome_usuario: "",
    senha: "",
    tipo: "funcionario",
    primeiro_acesso: false,
});

export type IContextValues = {
    user: User;
    firstAccess: boolean;
    loading: boolean;
    authenticated: boolean;
    login: (credentials: ICredentials) => Promise<boolean>;
    firstChangePassword: (password: string) => void;
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