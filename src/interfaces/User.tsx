export interface UserPost {
    nome_usuario: string;
    email: string;
    senha: string;
    tipo: string;
}

export interface UserPT {
    id_usuario: number;
    nome_usuario: string;
    email: string;
    senha: string;
    tipo: string;
}

export class User {
    id: number;

    name: string;
    email: string;

    password: string = "";
    
    type: string;

    constructor(usuario: UserPT) {
        this.id = usuario.id_usuario;
        this.name = usuario.nome_usuario;
        this.email = usuario.email;
        this.type = usuario.tipo;
    }

    setPassword(password: string) {
        this.password = password;
    }
}