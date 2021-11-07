import { useContext } from "react";
import styles from "./OrderConfiguration.module.css";

import {
    FaHome,
    FaBox,
    FaHamburger,
    FaMoneyBill,
    FaWifi
} from "react-icons/fa"
import { Button } from "components/forms/Button";

import { CartContext } from "contexts/CartContext/CartContext";

import { currencyFormat } from "utils/currencyFormat";

function OrderConclusion() {
    const { order, finishOrder } = useContext(CartContext);
    
    function showPaymentMethod(paymentMethod: string): string {
        switch (paymentMethod) {
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

    function calculateChangePayment(): string {
        const changeValue = order.total_payed - order.total_price;

        if (changeValue === 0) {
            return "--";
        } else {
            return currencyFormat(changeValue)
        }
    };

    return (
        <div className={styles.orderConfigurationContainer}>
            <div className={ styles.configurationColumn }>
                <header>
                    <h6>Resumo geral</h6>
                </header>

                <hr />

                <div>
                    { order.is_local_order ? (
                        <div className={ styles.orderLocationCard }>
                            <span>Efetuado presencialmente</span>
                            <FaHome />
                        </div>
                    ) : (
                        <div className={ styles.orderLocationCard }>
                            <span>Efetuado a distância</span>
                            <FaWifi />
                        </div>
                    )}

                    { order.order_type === "local" ? (
                        <div className={ styles.orderConsumeCard }>
                            <span>Para comer</span>
                            <FaHamburger color="var(--secondary)" />
                        </div>
                    ) : (
                        <div className={ styles.orderConsumeCard }>
                            <span>Para viagem</span>
                            <FaBox color="var(--secondary)" />
                        </div>
                    )}
                </div>
            </div>
            <div className={ styles.configurationColumn }>
                <header>
                    <h6>Resumo do pagamento</h6>
                </header>

                <hr />

                <div>
                    { order.payment_method && (
                        <div className={ styles.orderPaymentInfoCard }>
                            <span>Pagamento em { showPaymentMethod(order.payment_method) }</span>
                            <FaMoneyBill />
                        </div>
                    )}
                    
                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Valor a pagar</span>
                        <span>R${ currencyFormat(order.total_price) }</span>
                    </div>

                    { order.payment_method === "money" && (
                        <div>
                            <div className={ styles.orderPaymentInfoCard }>
                                <span>Valor pago</span>
                                <span>R${ 
                                    order.total_payed ? currencyFormat(order.total_payed) :
                                    currencyFormat(order.total_price)
                                }</span>
                            </div>

                            <div className={ styles.orderPaymentInfoCard }>
                                <span>Troco</span>
                                <span>R${ calculateChangePayment() }</span>
                            </div>
                        </div>
                    )}

                    <Button 
                        onClick={() => { finishOrder() }}
                        className="w-100"
                        text="Efetuar pedido"
                    />
                </div>
            </div>
        </div>
    )
}

export { OrderConclusion };