
import { useState } from "react";

import { Stepper } from "components/display/Stepper";
import { Button } from "components/forms/Button";

import { 
    FaArrowLeft,
    FaArrowRight, 
} from "react-icons/fa";

import { Dashboard } from "templates/Dashboard";

import styles from "./OrderRegister.module.css";

import { OrderSummary } from "../OrderSummary";
import { OrderConfigurationForm } from "../OrderConfigurationForm";

function OrderRegister() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps = [
        "Configurações gerais",
        "Configurações de pagamento",
        "Finalização"
    ];

    function handleNextStep() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Dashboard showCart>
            <div className={styles.orderRegisterContainer}>
                <header>
                    <h5>Registrar novo pedido</h5>
                </header>

                <main>
                    <Stepper 
                        steps={steps}
                        activeStep={activeStep}
                    />

                    { activeStep === 0 && ( 
                        <div className={ styles.configurationColumn }>
                            <header>
                                <h6>Configurações gerais</h6>
                            </header>

                            <hr />

                            <main>
                                <div className="form-check">
                                    <input checked disabled className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Pedido efetuado presencialmente
                                    </label>
                                </div>
                                
                                <div className="form-group mt-2 w-100">
                                    <label htmlFor="">Local de consumo (tipo de pedido)</label>
                                    <select className="form-select form-select-md" aria-label="Default select example">
                                        <option selected>Selecione o local de consumo</option>
                                        <option value="1">No local</option>
                                        <option value="2">Pra viagem</option>
                                    </select>
                                </div>
                            </main>
                        </div>
                    )} 

                    { activeStep === 1 && ( 
                        <div className={ styles.configurationColumn }>
                            <header>
                                <h6>Configurações de Pagamento</h6>
                            </header>

                            <hr />

                            <main>
                                <div className="form-group w-100">
                                    <label htmlFor="">Pagamento em</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Selecione o tipo de pagamento</option>
                                        <option value="1">Dinheiro</option>
                                        <option value="2">Cartão de Crédito</option>
                                        <option value="2">Cartão de Débito</option>
                                    </select>
                                </div>
                            </main>
                        </div>
                    )} 

                    { activeStep === 2 && (
                        <OrderConfigurationForm />
                    )}

                    <footer>
                        <Button
                            onClick={handleBack}
                            transparent
                            disabled={ activeStep === 0 }
                            icon={<FaArrowLeft />}
                        />

                        <Button
                            onClick={handleNextStep}
                            transparent
                            disabled={ activeStep === steps.length - 1 }
                            icon={<FaArrowRight />}
                        />
                    </footer>
                </main>

            </div>
        </Dashboard>
    )
};

export { OrderRegister };