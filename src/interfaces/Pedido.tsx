export interface IPedido {
    id: number;
    codigo_pedido?: string;
    cliente?: string;
    endereco?: string;
    atendimento_presencial: boolean;
    valor_total: number;
    valor_pago: number;
    metodo_pagamento?: "money" | "credit" | "debit";
    status: string;
    criado_em?: Date;
    finalizado_em?: Date;
    funcionario?: Date;
    tipo_consumo?: "local" | "viagem";
};