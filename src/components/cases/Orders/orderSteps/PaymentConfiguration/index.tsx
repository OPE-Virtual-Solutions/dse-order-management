import { useContext, useState, useEffect } from "react";

import { CartContext } from "contexts/CartContext/CartContext";

import { currencyFormat } from "utils/currencyFormat";

import styles from "./PaymentConfiguration.module.css";

type Props = {
    setStepCompletion: any;
}

function PaymentConfiguration({
    setStepCompletion
}: Props) {
    const {
        order,
        updateOrderInfo
    } = useContext(CartContext);

    const [payment, setPayment] = useState<string>("default")

    function handlePaymentChange(event: any) {
        const value = event.target.value;
        const _order = { ...order };

        if (value !== "default") {
            _order.paymentMethod = value;
            setStepCompletion(true);
        } else {
            _order.paymentMethod = undefined;
            setStepCompletion(false);
        }
        
        setPayment(value);
        updateOrderInfo(_order);
    };

    function isOptionSelected(optionValue: string): boolean {
        return optionValue === order.paymentMethod;
    }

    function handlePaymentValueChange(event: any) {
        changePaymentValue(Number(event.target.value))

    }

    function changePaymentValue(value: number) {
        const _order = { ...order };
        _order.totalPayed = value;

        updateOrderInfo(_order);
    }

    useEffect(() => {
        if (order.paymentMethod) { 
            setPayment(order.paymentMethod);
            setStepCompletion(true);
        } else {
            setStepCompletion(false);
        }

        changePaymentValue(order.totalPrice);
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
                        <span>R${ currencyFormat(order.totalPrice) }</span>
                    </div>

                    <label>Valor pago pelo cliente</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">R$</span>
                        </div>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Valor pago pelo cliente" 
                            onChange={handlePaymentValueChange}
                            defaultValue={ order.totalPrice }
                            min={ order.totalPrice }
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

export { PaymentConfiguration };