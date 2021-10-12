import { useState } from "react";
import { 
    Step,
    Stepper as StepContainer,
    StepLabel  
} from "@material-ui/core";

type Props = {
    steps: string[];
    activeStep: number;
}

function Stepper({ 
    steps, 
    activeStep, 
}: Props) {
    const [skipped, setSkipped] = useState<Set<number>>(new Set());

    function isStepSkipped(step: number) {
        return skipped.has(step);
    };

    return (
        <StepContainer className="w-100" activeStep={ activeStep }>
            {steps.map((label, index) => {
                const stepProps: any = {};

                if (isStepSkipped(index)) stepProps.completed = false;

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel>{ label }</StepLabel>
                    </Step>
                )
            })}
        </StepContainer>
    );
};

export { Stepper };