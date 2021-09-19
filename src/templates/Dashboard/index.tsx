import { ReactNode } from "react";

import styles from "./styles.module.css";

import { SideMenu } from "components/navigation/SideMenu";
import { Cart } from "components/display/Cart";

type Props = {
    children: ReactNode;
    className?: string;
    showCart?: boolean;
}

function Dashboard({ children, className = "", showCart = false }: Props) {
    return (
        <div className={ `${className} ${styles.dashboardContainer}` }>
            <SideMenu />

            <div className={styles.contentContainer}>
                { children }
            </div>

            { showCart && (
                <div className={styles.cartContainer}>
                    <Cart />
                </div>
            )}
        </div>
    )
};

export { Dashboard };
