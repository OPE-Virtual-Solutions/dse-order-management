import { ReactNode, MouseEventHandler } from "react";

import styles from "./styles.module.css";

type Props = {
    text?: string;
    icon?: ReactNode;
    type?: "button" | "submit";
    transparent?: boolean;
    outline?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    disabled?: boolean;
}

function Button({
    text,
    icon,
    type = "button",
    transparent = false,
    outline = false,
    className = "",
    onClick = () => {},
    children,
    disabled = false
}: Props) {
    function getButtonStyle() {
        return (outline ? styles.buttonOutline : transparent ? styles.buttonTransparent : styles.button);
    }

    return (
        <button 
            disabled={disabled}
            onClick={onClick}
            type={type} 
            className={`${ getButtonStyle() } ${ className }`}
        >
            { children ? ( children ) : (
                <>
                    { icon }

                    { text && ( <span>{ text }</span> )}
                </>
            )}
        </button>
    )
}

export { Button };
