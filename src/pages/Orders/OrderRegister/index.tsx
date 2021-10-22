
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

import { Snackbar } from "@material-ui/core";

function OrderRegister() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const [canContinue, setCanContinue] = useState<boolean>(false);
    const [showSnack, setShowSnack] = useState<boolean>(false);

    const steps = [
        "Configurações gerais",
        "Configurações de pagamento",
        "Finalização"
    ];

    function handleNextStep() {
        (canContinue) ? 
            setActiveStep((prevActiveStep) => prevActiveStep + 1) 
        : setShowSnack(true);

    };

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getErrorMessage(): string {
        switch (activeStep) {
            case 0:
                return "Configure os dados do pedido antes de continuar";
            case 1:
                return "Configure as informações de pagamento antes de continuar";
            default: 
                return "Configure o pedido antes de continuar";
        }
    }

    return (
        <Dashboard showCart cartProps={{ showCardActions: activeStep === 2 ? false : true }}>
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
                        <GlobalConfiguration setStepCompletion={setCanContinue} />
                    )} 

                    { activeStep === 1 && ( 
                        <PaymentConfiguration setStepCompletion={setCanContinue} />
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

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={ showSnack }
                autoHideDuration={3000}
                onClose={() => { setShowSnack(false) }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ getErrorMessage() }</span>}
            />
        </Dashboard>
    )
};

export { OrderRegister };