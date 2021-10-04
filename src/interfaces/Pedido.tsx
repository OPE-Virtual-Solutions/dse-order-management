export interface IPedido {
    codigo_pedido?: string;
    cliente?: string;
    endereco?: string;
    atendimento_presencial: boolean;
    valor_total: number;
    metodo_pagamento: string;
    status: string;
    criado_em?: Date;
    finalizado_em?: Date;
    funcionario?: Date;
};