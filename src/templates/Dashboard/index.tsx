import { ReactNode, useContext, useEffect } from "react";

import styles from "./styles.module.css";

import { SideMenu } from "components/navigation/SideMenu";
import { Cart, CartProps } from "components/display/Cart";
import { UserContext } from "contexts/UserContext/UserContext";
import { Dialog } from "@material-ui/core";
import { UserPasswordModal } from "components/cases/Users/UserPasswordModal";

type Props = {
    children: ReactNode;
    className?: string;
    showCart?: boolean;
    cartProps?: CartProps;
}

function Dashboard({ children, className = "", showCart = false, cartProps }: Props) {
    const { firstAccess } = useContext(UserContext);

    return (
        <div className={ `${className} ${styles.dashboardContainer}` }>
            <SideMenu />

            <div className={styles.contentContainer}>
                { children }
            </div>

            { showCart && (
                <div className={styles.cartContainer}>
                    <Cart {...cartProps} />
                </div>
            )}

            {firstAccess && (
                <Dialog maxWidth="sm" open={firstAccess} onClose={() => {}}>
                    <UserPasswordModal />
                </Dialog>
            )}
        </div>
    )
};

export { Dashboard };
