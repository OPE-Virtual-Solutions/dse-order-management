import { GridColDef, GridValueFormatterParams } from "@material-ui/data-grid";

import { format, parseISO } from "date-fns";
import { OrderService } from "services/order.service";
import { currencyFormat } from "utils/currencyFormat";

export const columns: GridColDef[] = [
    {
        field: "id", 
        headerName: "ID", 
        width: 90,
    },
    {
        field: "createdAt", 
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
        field: "finishedAt", 
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
        field: "totalPrice", 
        headerName: "Valor total", 
        flex: 1,
        cellClassName: "text-capitalize",
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) return `R$${currencyFormat(Number(data.value))}`
        }
    },
    {
        field: "paymentMethod",
        headerName: "Método de Pagamento",
        flex: 1,
        cellClassName: "text-capitalize",
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) return OrderService.formatPaymentMethod(data.value.toString())
        }
    },
    {
        field: "isLocalOrder",
        headerName: "Efetuado presencialmente",
        flex: 1,
        type: "boolean"
    },
    {
        field: "status",
        headerName: "Status",
        cellClassName: "text-capitalize",
        flex: 1,
        valueFormatter: (data: GridValueFormatterParams) => {
            if (data.value) return OrderService.formatStatus(data.value.toString())
        }
    }
]