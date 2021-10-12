import { useContext } from "react";
import { OrderContext } from "contexts/OrderContext/OrderContext";

import styles from "./GlobalConfiguration.module.css";

function GlobalConfiguration() {
    const { 
        summary,
        onSummaryChange 
    } = useContext(OrderContext);

    function handleLocalChange(event: any) {
        console.log(event.target.value);

        const value = event.target.value;

        if (value !== "default") {
            const _summary = summary; 

            _summary.tipo_consumo = value;

            onSummaryChange(_summary);
        }
    };

    function isOptionSelected(optionSelected: string) {
        return optionSelected === summary.tipo_consumo;
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
                        checked={ summary.atendimento_presencial }
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
                        <option value="default" selected={ !summary.tipo_consumo }>Selecione o local de consumo</option>
                        <option value="local" selected={isOptionSelected("local")}>No local</option>
                        <option value="viagem" selected={isOptionSelected("viagem")}>Pra viagem</option>
                    </select>
                </div>
            </main>
        </div>
    )
};

export { GlobalConfiguration };