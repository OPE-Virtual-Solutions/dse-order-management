import { useContext } from "react";

import styles from "./GlobalConfiguration.module.css";
import { CartContext } from "contexts/CartContext/CartContext";

function GlobalConfiguration() {
    const {
        order,
        updateOrderInfo
    } = useContext(CartContext);

    function handleLocalChange(event: any) {
        const value = event.target.value;

        if (value !== "default") {
            const _order = { ...order };
            _order.order_type = value;

            updateOrderInfo(_order);
        }
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