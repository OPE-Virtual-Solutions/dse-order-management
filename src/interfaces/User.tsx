export interface UserPost {
    nome_usuario: string;
    email: string;
    senha: string;
    tipo: "funcionario" | "cliente";

    cargo?: string;
    telefone?: string;
}

export interface FuncionarioPT {
    id_funcionario: number;
    cargo: string;
}

export interface ClientePT {
    id_cliente: number;
    nome_cliente: string;
    telefone: string;
}

export class UserPT {
    id_usuario: number;
    nome_usuario: string;
    email: string;
    senha?: string;
    tipo: "funcionario" | "cliente";

    funcionario?: FuncionarioPT;
    cliente?: ClientePT;

    primeiro_acesso: boolean | undefined;

    constructor(user: User) {

        this.id_usuario = user.id;
        this.nome_usuario = user.name;
        this.email = user.email;
        this.senha = user.password;
        this.tipo = user.type;

        this.primeiro_acesso = user.firstAccess;
    }
}

export class User {
    id: number;

    name: string;
    email: string;

    password?: string;
    
    type: "funcionario" | "cliente";

    role?: string;

    phone?: string;

    firstAccess?: boolean;

    constructor(usuario: UserPT) {
        this.id = usuario.id_usuario;
        this.name = usuario.nome_usuario;
        this.email = usuario.email;
        this.type = usuario.tipo;

        this.firstAccess = usuario.primeiro_acesso;
        
        switch(usuario.tipo) {
            case "funcionario":
                if (usuario.funcionario) this.role = usuario.funcionario.cargo;
                break;
            case "cliente":
                if (usuario.cliente) this.phone = usuario.cliente.telefone;
                break;
        }
    }

    public setPassword(password: string) {
        this.password = password;
    }
}