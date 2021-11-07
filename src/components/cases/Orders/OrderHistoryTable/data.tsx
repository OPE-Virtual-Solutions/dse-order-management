import { GridColDef, GridValueFormatterParams } from "@material-ui/data-grid";

import { format, parseISO } from "date-fns";
import { currencyFormat } from "utils/currencyFormat";

function formatPaymentMethod(method: string) {
    switch (method) {
        case "money":
            return "dinheiro"
        case "credit":
            return "cartão de crédito"
        case "debit":
            return "cartão de débito"
        default:
            return "dinheiro"
    }
};

export const columns: GridColDef[] = [
    {
        field: "id", 
        headerName: "ID", 
        width: 90,
    },
    {
        field: "created_at", 
        headerName: "Criado em", 
        flex: 1,
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) {
                const date = data.value.toString();

                return format(parseISO(date), "dd'/'MM'/'yyyy 'às' HH:hh'h'");
            } else {
                return "Nenhum"
            }
        },
    },
    {
        field: "finished_at", 
        headerName: "Finalizado em", 
        flex: 1,
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) {
                const date = data.value.toString();

                return format(parseISO(date), "dd'/'MM'/'yyyy 'às' HH:hh'h'");
            } else {
                return "Pedido em andamento"
            }
        },
    },
    {
        field: "total_price", 
        headerName: "Valor total", 
        flex: 1,
        cellClassName: "text-capitalize",
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) return `R$${currencyFormat(Number(data.value))}`
        }
    },
    {
        field: "payment_method",
        headerName: "Método de Pagamento",
        flex: 1,
        cellClassName: "text-capitalize",
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) return formatPaymentMethod(data.value.toString())
        }
    },
    {
        field: "is_local_order",
        headerName: "Efetuado presencialmente",
        flex: 1,
        type: "boolean"
    },
    {
        field: "status",
        headerName: "Status",
        cellClassName: "text-capitalize",
        flex: 1
    }
]