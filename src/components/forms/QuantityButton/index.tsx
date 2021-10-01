import { MouseEventHandler } from "react";

import { 
    FaChevronUp, 
    FaChevronDown 
} from "react-icons/fa";

import styles from "./QuantityButton.module.css";

type Props = {
    onSum: MouseEventHandler<HTMLButtonElement>;
    onSubtract: MouseEventHandler<HTMLButtonElement>;
    quantity: number;
}

function QuantityButton({
    onSum, 
    onSubtract,
    quantity
}: Props) {
    return (
        <div className={ styles.buttonContainer }>
            <button disabled={ quantity === 1 ? true : false } onClick={onSubtract}>
                <FaChevronDown size={12} />
            </button>
            <span>{ quantity }</span>
            <button onClick={onSum}>
                <FaChevronUp size={12}/>
            </button>
        </div>
    )
}

export { QuantityButton };
