import { OrderContext } from "contexts/OrderContext/OrderContext";
import { useContext, useState, useEffect } from "react";
import { currencyFormat } from "utils/currencyFormat";

import styles from "./PaymentConfiguration.module.css";

function PaymentConfiguration() {
    const { 
        summary,
        onSummaryChange 
    } = useContext(OrderContext);

    const [payment, setPayment] = useState<string>("default")

    function handlePaymentChange(event: any) {
        const value = event.target.value;

        if (value !== "default") {
            const _summary = summary; 
            _summary.metodo_pagamento = value;

            onSummaryChange(_summary)
            setPayment(value);
        }
    };

    function isOptionSelected(optionValue: string): boolean {
        return optionValue === summary.metodo_pagamento;
    }

    function handlePaymentValueChange(event: any) {
        changePaymentValue(Number(event.target.value))

    }

    function changePaymentValue(value: number) {
        const _summary = summary;

        _summary.valor_pago = value;

        onSummaryChange(_summary);
    }

    useEffect(() => {
        if (summary.metodo_pagamento) setPayment(summary.metodo_pagamento);

        changePaymentValue(summary.valor_total);
    }, []);

    return (
        <div className={ styles.paymentConfigurationContainer }>
            <header>
                <h6>Configurações de Pagamento</h6>
            </header>

            <hr />

            <main>
                <div className="form-group w-100">
                    <label htmlFor="selectPayment">Pagamento em</label>
                    <select 
                        onChange={handlePaymentChange}
                        id="selectPayment"
                        className="form-select" 
                        aria-label="Default select example"
                    >
                        <option value="default" selected>Selecione o tipo de pagamento</option>
                        <option value="money" selected={isOptionSelected("money")}>Dinheiro</option>
                        <option value="credit" selected={isOptionSelected("credit")}>Cartão de Crédito</option>
                        <option value="debit" selected={isOptionSelected("debit")}>Cartão de Débito</option>
                    </select>
                </div>
            </main>
            
            { payment === "money" && (
                <div className={ styles.moneyPaymentForm }>
                    <hr />

                    <label>Informações de pagamento em dinheiro</label>
                    <div className={ styles.moneyPaymentInfo }>
                        <span>Valor a pagar</span>
                        <span>R${ currencyFormat(summary.valor_total) }</span>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">R$</span>
                        </div>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Valor pago pelo cliente" 
                            onChange={handlePaymentValueChange}
                            defaultValue={ summary.valor_total }
                            min={ summary.valor_total }
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

export { PaymentConfiguration };