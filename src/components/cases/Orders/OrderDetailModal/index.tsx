import styles from "./OrderDetailModel.module.css";

import { Order } from "interfaces";
import { OrderProductInfo } from "../OrderProductInfo";

import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { FaCalendarCheck, FaCalendarAlt } from "react-icons/fa";
import { OrderService } from "services/order.service";

type Props = {
    order: Order;
}

function OrderDetailModal({ order }: Props) {
    const products = order.products || [];

    return (
        <div className={styles.container}>
            <div className={`${styles.orderContainer} ${styles.column}`}>
                <header>
                    <h5>Pedido #{order.id}</h5>

                    <div>
                        <FaCalendarAlt color="var(--subtext)"/>
                        <span>
                            Registrado: { order.createdAt && 
                                format(
                                    parseISO(order.createdAt.toString()), 
                                    "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                                    {
                                        locale: pt
                                    }
                                )
                            }
                        </span>
                    </div>
                    <div>
                        <FaCalendarCheck color="var(--subtext)"/>
                        <span>
                            Finalizado: { order.finishedAt ?
                                format(
                                    parseISO(order.finishedAt?.toString()), 
                                    "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                                    {
                                        locale: pt
                                    }
                                )
                            : "Pedido não finalizado"}
                        </span>
                    </div>
                </header>
                                    
                <main>
                    <span>Pagamento efetuado via</span>
                    <p>{ OrderService.formatPaymentMethod(order.paymentMethod || "") }</p>

                    <span>Cliente efetuou pedido</span>
                    <p>{order.isLocalOrder ? "Presencialmente" : "Online (delivery)"}</p>
                    
                    <div className={styles.observationContainer}>
                        <span>Observação</span>
                        <p>
                            {order.note ? order.note : "Nenhuma observação registrada"}
                        </p>
                    </div>

                    {order.status === "cancelado" && (
                        <div className={styles.observationContainer}>
                            <span>Motivo do cancelamento</span>
                            <p>
                                {order.cancelNote ? order.cancelNote : "Nenhum motivo registrado"}
                            </p>
                        </div>
                    )}

                </main>

            </div>
            <div className={`${styles.column} ${styles.productsContainer}`}>
                <header>
                    <h5>Produtos</h5>

                    <div className={styles.countBadge}>
                        <span>{ products.length }</span>
                    </div>
                </header>

                {products.map((cartProduct, index) => (
                    <OrderProductInfo
                        key={index}
                        cartProduct={cartProduct}
                    />
                ))}
            </div>
        </div>
    )
}

export { OrderDetailModal };