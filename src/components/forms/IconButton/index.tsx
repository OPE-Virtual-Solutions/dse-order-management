import { ReactNode, MouseEventHandler } from "react";

import styles from "./styles.module.css";

type Props = {
    text: string;
    icon: ReactNode;
    type?: "button" | "submit";
    outline?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function IconButton({
    text,
    icon,
    type = "button",
    outline = false,
    className = "",
    onClick = () => {}
}: Props) {
    return (
        <button 
            onClick={onClick}
            type={type} 
            className={`${ outline ? styles.buttonOutline : styles.button } ${ className }`}
        >
            { icon }
            
            { text }
        </button>
    )
}

export { IconButton };
