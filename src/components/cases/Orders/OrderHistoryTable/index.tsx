import { useState, useEffect } from "react";

import tableStyles from "styles/Table.module.css";

import { 
    Dialog,
    TableContainer, 
} from "@material-ui/core";

import { Order } from "interfaces";
import { OrderService } from "services/order.service";

import { OrderDetailModal } from "../OrderDetailModal";

import { OrderInstance } from "contexts/CartContext/ICartContext";

import { DataGrid } from "@material-ui/data-grid";

import { columns } from "./data";

function OrderHistoryTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(OrderInstance);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    function handleCellSelection(event: any) {
        setSelectedOrder(event.row);
        setOpenModal(true);
    };

    async function retrieveData() {
        await OrderService.listAll().then((response) => {
            setOrders(response);
            setLoading(false);
        });
    };

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <TableContainer className={ tableStyles.tableContainer }>
            <DataGrid
                autoPageSize
                style={{ height: 400, width: "100%" }}
                rows={orders}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                hideFooter={true}
                loading={loading}
                onCellClick={handleCellSelection}
            />

            <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => { setOpenModal(false) }}>
                <OrderDetailModal order={selectedOrder} />
            </Dialog>
        </TableContainer>
    )
};

export { OrderHistoryTable };