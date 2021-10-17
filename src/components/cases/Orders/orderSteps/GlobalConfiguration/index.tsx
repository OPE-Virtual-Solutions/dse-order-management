import { useContext, useEffect } from "react";

import styles from "./GlobalConfiguration.module.css";
import { CartContext } from "contexts/CartContext/CartContext";

type Props = {
    setStepCompletion: any;
}

function GlobalConfiguration({
    setStepCompletion
}: Props) {
    const {
        order,
        updateOrderInfo
    } = useContext(CartContext);

    useEffect(() => {
        (order.order_type) ? setStepCompletion(true) : setStepCompletion(false); 
    }, []);

    function handleLocalChange(event: any) {
        const value = event.target.value;
        
        const _order = { ...order };

        if (value !== "default") {
            _order.order_type = value;
            setStepCompletion(true);
        } else {
            _order.order_type = undefined;
            setStepCompletion(false);
        }

        updateOrderInfo(_order);
    };

    function isOptionSelected(optionSelected: string) {
        return optionSelected === order.order_type;
    }

    return (
        <div className={ styles.globalConfigurationContainer }>
            <header>
                <h6>Configurações gerais</h6>
            </header>

            <hr />

            <main>
                <div className="form-check">
                    <input 
                        checked={ order.is_local_order }
                        disabled 
                        className="form-check-input" 
                        type="checkbox" 
                        value="" 
                        id="flexCheckDefault" 
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Pedido efetuado presencialmente
                    </label>
                </div>
                
                <div className="form-group mt-2 w-100">
                    <label htmlFor="selectPlacement">Local de consumo (tipo de pedido)</label>
                    <select 
                        onChange={handleLocalChange}
                        id="selectPlacement"
                        className="form-select form-select-md" 
                        aria-label="Default select example"
                    >
                        <option value="default" selected={ !order.order_type }>Selecione o local de consumo</option>
                        <option value="local" selected={isOptionSelected("local")}>No local</option>
                        <option value="viagem" selected={isOptionSelected("viagem")}>Pra viagem</option>
                    </select>
                </div>
            </main>
        </div>
    )
};

export { GlobalConfiguration };