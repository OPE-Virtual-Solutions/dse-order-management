import { useState, useEffect } from "react";

import tableStyles from "styles/Table.module.css";

import { 
    Dialog,
    TableContainer, 
} from "@material-ui/core";

import { Pagination } from "components/display/Pagination";

import { Order } from "interfaces";
import { OrderService } from "services/order.service";

import { OrderDetailModal } from "../OrderDetailModal";

import { OrderInstance } from "contexts/CartContext/ICartContext";

import { DataGrid } from "@material-ui/data-grid";

import { columns } from "./data";

function OrderHistoryTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(OrderInstance);

    const [count, setCount] = useState<number>(0);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    function handleCellSelection(event: any) {
        setSelectedOrder(event.row);
        setOpenModal(true);
    };

    async function retrieveData() {
        await OrderService.listByPage(1).then((response) => {
            const { list, count } = response;

            setCount(count);
            setOrders(list);

            setLoading(false);
        });
    };

    async function changePage(event: any) {
        const _page = event.selected + 1;
        setLoading(true);

        await OrderService.listByPage(_page).then((response) => {
            const { list } = response;

            setOrders(list)
            setLoading(false);
        })
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <TableContainer className={ tableStyles.tableContainer }>
            <DataGrid
                autoPageSize
                autoHeight
                style={{ width: "100%" }}
                rows={orders}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                hideFooter={true}
                loading={loading}
                onCellClick={handleCellSelection}
            />
            <Pagination 
                pageCount={count}
                onPageChange={changePage}
            />

            <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => { setOpenModal(false) }}>
                <OrderDetailModal order={selectedOrder} />
            </Dialog>
        </TableContainer>
    )
};

export { OrderHistoryTable };