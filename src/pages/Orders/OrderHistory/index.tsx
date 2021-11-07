import styles from "./OrderHistory.module.css";

import { OrderHistoryTable } from "components/cases/Orders/OrderHistoryTable";

import { Dashboard } from "templates/Dashboard";

function OrderHistory() {
    return (
        <Dashboard>
            <div className={styles.container}>
                <header>
                    <h5>Histórico de Pedidos</h5>
                </header>

                <div className={styles.tableContainer}>
                    <OrderHistoryTable />
                </div>
            </div>
        </Dashboard>
    )
};

export { OrderHistory };