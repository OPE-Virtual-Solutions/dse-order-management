import styles from "./OrderConfiguration.module.css";

import {
    FaHome,
    FaBox,
    FaMoneyBill
} from "react-icons/fa"
import { Button } from "components/forms/Button";

function OrderConfigurationForm() {
    return (
        <div className={styles.orderConfigurationContainer}>
            <div className={ styles.configurationColumn }>
                <header>
                    <h6>Resumo geral</h6>
                </header>

                <hr />

                <div>
                    <div className={ styles.orderLocationCard }>
                        <span>Efetuado presencialmente</span>
                        <FaHome />
                    </div>
                    <div className={ styles.orderConsumeCard }>
                        <span>Para viagem</span>
                        <FaBox color="var(--secondary)" />
                    </div>
                </div>
            </div>
            <div className={ styles.configurationColumn }>
                <header>
                    <h6>Resumo do pagamento</h6>
                </header>

                <hr />

                <div>
                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Pagamento em dinheiro</span>
                        <FaMoneyBill />
                    </div>
                    
                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Valor a pagar</span>
                        <span>R$19.00</span>
                    </div>

                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Valor pago</span>
                        <span>R$19.00</span>
                    </div>

                    <div className={ styles.orderPaymentInfoCard }>
                        <span>Troco</span>
                        <span>R$--</span>
                    </div>

                    <Button 
                        className="w-100"
                        text="Efetuar pedido"
                    />
                </div>
            </div>
        </div>
    )
}

export { OrderConfigurationForm };