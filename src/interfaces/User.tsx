export interface UserPost {
    nome_usuario: string;
    email: string;
    senha: string;
    tipo: "funcionario" | "cliente";
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

export interface UserPT {
    id_usuario: number;
    nome_usuario: string;
    email: string;
    senha: string;
    tipo: "funcionario" | "cliente";

    funcionario?: FuncionarioPT;
    cliente?: ClientePT;
}

export class User {
    id: number;

    name: string;
    email: string;

    password?: string;
    
    type: "funcionario" | "cliente";

    role?: string;

    phone?: string;

    constructor(usuario: UserPT) {
        this.id = usuario.id_usuario;
        this.name = usuario.nome_usuario;
        this.email = usuario.email;
        this.type = usuario.tipo;
        
        switch(usuario.tipo) {
            case "funcionario":
                if (usuario.funcionario) this.role = usuario.funcionario.cargo;
                break;
            case "cliente":
                if (usuario.cliente) this.phone = usuario.cliente.telefone;
                break;
        }
    }

    setPassword(password: string) {
        this.password = password;
    }
}