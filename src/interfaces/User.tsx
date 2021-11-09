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

type UserConstructor = {
    id: number;
    fullName: string;
    email: string;
    type: "funcionario" | "cliente";
    costumer: any;
    employee: any;
    firstAccess: boolean;
}

export class User {
    id: number;

    fullName: string;
    email: string;

    password?: string;
    
    type: "funcionario" | "cliente";

    role?: string;

    phone?: string;

    firstAccess?: boolean;

    constructor({
        id = -1,
        fullName,
        email,
        type,
        costumer,
        employee,
        firstAccess,
    }: UserConstructor) {
        this.id = id || -1;
        this.fullName = fullName;
        this.email = email;
        this.type = type;

        this.firstAccess = firstAccess;
        
        switch(type) {
            case "funcionario":
                if (employee) {
                    this.role = employee.role;
                }

                break;
            case "cliente":
                if (costumer) {
                    this.phone = costumer.phone;
                }

                break;
        }
    }

    public setPassword(password: string) {
        this.password = password;
    }
}