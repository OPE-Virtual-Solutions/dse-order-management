import { useHistory } from "react-router-dom";

import { Button } from "components/forms/Button";
import styles from "./OrderSummary.module.css";

type Props = {
    subtotal: number;
    tax: number;
    total: number;
}

function OrderSummary({
    subtotal,
    tax,
    total,
}: Props) {
    let history = useHistory();

    return (
        <div className={ styles.orderSummaryContainer }>
            <div>
                <span>Subtotal</span>
                <span>R${ subtotal }</span>
            </div>
            <div>
                <span>Taxa</span>
                <span>R${ tax === 0 ? "--" : tax }</span>
            </div>
            <div>
                <span>Total</span>
                <span>R${ total }</span>
            </div>

            <Button
                onClick={() => history.replace("/order-dashboard")} 
                className="w-100" 
                text="Cancelar" 
                outline 
            />
        </div>
    )
};

export { OrderSummary };