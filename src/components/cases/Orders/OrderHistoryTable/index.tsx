import { useState, useEffect } from "react";

import tableStyles from "styles/Table.module.css";

import { 
    Collapse,
    Dialog,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
} from "@material-ui/core";

import { Order } from "interfaces";
import { OrderService } from "services/order.service";

import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { currencyFormat } from "utils/currencyFormat";
import { OrderDetailModal } from "../OrderDetailModal";

import { OrderInstance } from "contexts/CartContext/ICartContext";

function OrderHistoryTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(OrderInstance);

    const [openModal, setOpenModal] = useState<boolean>(true);

    const headers: string[] = [
        "ID",
        "Criado em",
        "Valor Total",
        "Mét. Pagamento",
        "Status"
    ];

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

    function onOrderSelection(order: Order) {
        setSelectedOrder(order);
        setOpenModal(true);
    }

    async function retrieveData() {
        await OrderService.listAll().then((response) => {
            setOrders(response);
        });
    };

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <TableContainer className={ tableStyles.tableContainer }>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>
                                { header }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={ tableStyles.tableBody }>
                    {orders.map((order, index) => (
                        <TableRow 
                            key={index}
                            onClick={() => { onOrderSelection(order) }}
                        >
                            <TableCell style={{ fontWeight: "bold" }}>
                                { order.id }
                            </TableCell>
                            <TableCell style={{ color: "var(--subtext)" }}>
                                { order.created_at && 
                                    format(
                                        parseISO(order.created_at?.toString()), 
                                        "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                                        {
                                            locale: pt
                                        }
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                <span style={{ fontWeight: "bold", color: "var(--subtext)" }}>R$</span>
                                { currencyFormat(order.total_price) }
                            </TableCell>
                            <TableCell style={{ textTransform: "capitalize" }}>
                                { formatPaymentMethod(order.payment_method || "") }
                            </TableCell>
                            <TableCell style={{ textTransform: "capitalize" }}>
                                { order.status }
                            </TableCell>
                            <TableCell colSpan={5}>
                                <Collapse>
                                    <span>Teste</span>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => { setOpenModal(false) }}>
                <OrderDetailModal order={selectedOrder} />
            </Dialog>
        </TableContainer>
    )
};

export { OrderHistoryTable };