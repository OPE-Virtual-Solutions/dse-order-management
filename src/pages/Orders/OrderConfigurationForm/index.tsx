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

import { OrderContext } from "contexts/OrderContext/OrderContext";
import { currencyFormat } from "utils/currencyFormat";

function OrderConclusion() {
    const { summary, registerOrder } = useContext(OrderContext);
    
    function showPaymentMethod(paymentMethod: "money" | "debit" | "credit"): string {
        const paymentMethods = {
            money: "dinheiro",
            credit: "cartão de crédito",
            debit: "cartão de débito"
        };

        return paymentMethods[paymentMethod];
    };

    function calculateChangePayment(): string {
        const changeValue = summary.valor_pago - summary.valor_total;

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
                    { summary.atendimento_presencial ? (
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

                    { summary.tipo_consumo === "local" ? (
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
                    { summary.metodo_pagamento && (
                        <div className={ styles.orderPaymentInfoCard }>
                            <span>Pagamento em { showPaymentMethod(summary.metodo_pagamento) }</span>
                            <FaMoneyBill />
                        </div>
                    )}
                    
                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Valor a pagar</span>
                        <span>R${ currencyFormat(summary.valor_total) }</span>
                    </div>

                    { summary.metodo_pagamento === "money" && (
                        <div>
                            <div className={ styles.orderPaymentInfoCard }>
                                <span>Valor pago</span>
                                <span>R${ 
                                    summary.valor_pago ? currencyFormat(summary.valor_pago) :
                                    currencyFormat(summary.valor_total)
                                }</span>
                            </div>

                            <div className={ styles.orderPaymentInfoCard }>
                                <span>Troco</span>
                                <span>R${ calculateChangePayment() }</span>
                            </div>
                        </div>
                    )}

                    <Button 
                        onClick={() => { registerOrder() }}
                        className="w-100"
                        text="Efetuar pedido"
                    />
                </div>
            </div>
        </div>
    )
}

export { OrderConclusion };