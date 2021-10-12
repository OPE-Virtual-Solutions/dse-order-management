
import { useState } from "react";

import { Stepper } from "components/display/Stepper";
import { Button } from "components/forms/Button";

import { 
    FaArrowLeft,
    FaArrowRight, 
} from "react-icons/fa";

import { Dashboard } from "templates/Dashboard";

import styles from "./OrderRegister.module.css";

import { OrderConclusion } from "components/cases/Orders/OrderSteps/OrderConclusion";
import { GlobalConfiguration } from "components/cases/Orders/OrderSteps/GlobalConfiguration";
import { PaymentConfiguration } from "components/cases/Orders/OrderSteps/PaymentConfiguration";

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
                        <GlobalConfiguration />
                    )} 

                    { activeStep === 1 && ( 
                        <PaymentConfiguration />
                    )} 

                    { activeStep === 2 && (
                        <OrderConclusion />
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