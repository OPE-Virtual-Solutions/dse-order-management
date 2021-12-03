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
        const changeValue = order.totalPayed ? order.totalPayed - order.totalPrice : 0;

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
                    { order.isLocalOrder ? (
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

                    { order.type === "local" ? (
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
                    { order.paymentMethod && (
                        <div className={ styles.orderPaymentInfoCard }>
                            <span>Pagamento em { showPaymentMethod(order.paymentMethod) }</span>
                            <FaMoneyBill />
                        </div>
                    )}
                    
                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Valor a pagar</span>
                        <span>R${ currencyFormat(order.totalPrice) }</span>
                    </div>

                    { order.paymentMethod === "money" && (
                        <div>
                            <div className={ styles.orderPaymentInfoCard }>
                                <span>Valor pago</span>
                                <span>R${ 
                                    order.totalPayed ? currencyFormat(order.totalPayed) :
                                    currencyFormat(order.totalPrice)
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