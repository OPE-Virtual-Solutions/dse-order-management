export type UserTypeProp = {
    id: number;
    type: string;
    value: "funcionario" | "cliente";
}

export type UserRoleProp = {
    id: number;
    role: string;
    description: string;
}

export const UserTypes: UserTypeProp[] = [
    {
        id: Math.random(),
        type: "Cliente",
        value: "cliente"
    },
    {
        id: Math.random(),
        type: "Funcionário",
        value: "funcionario"
    }
]

export const UserRoles: UserRoleProp[] = [
    {
        id: Math.random(),
        role: "admin",
        description: "Terá acesso a todas as funcionalidades de gerenciamento e de pedidos."
    },
    {
        id: Math.random(),
        role: "atendente",
        description: "Terá acesso aos fluxos de pedido, envolvendo o quadro de acompanhamento, registro e histórico de pedidos."
    },
    {
        id: Math.random(),
        role: "estoquista",
        description: "Terá acesso aos fluxos de gerenciamento de produtos e ingredientes."
    }
]
