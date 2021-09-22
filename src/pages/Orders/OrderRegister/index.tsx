
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
        "Resumo do pedido",
        "Configurações e pagamento",
        "Conclusão"
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
                    <h4>Registrar novo pedido</h4>
                </header>

                <main>
                    <Stepper 
                        steps={steps}
                        activeStep={activeStep}
                    />

                    { activeStep === 0 && ( 
                        <OrderSummary
                            subtotal={49.99}
                            tax={0}
                            total={49.99}
                        />
                    )} 

                    { activeStep === 1 && ( 
                        <OrderConfigurationForm />
                    )} 

                    { activeStep === 2 && ( <span>Conclusão</span> ) } 

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