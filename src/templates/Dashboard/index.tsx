import { ReactNode } from "react";

import styles from "./styles.module.css";

import { SideMenu } from "components/SideMenu";

type Props = {
    children: ReactNode;
    className?: string;
}

function Dashboard({ children, className = "" }: Props) {
    return (
        <div className={ `${className} ${styles.dashboardContainer}` }>
            <SideMenu />

            <div className={styles.contentContainer}>
                { children }
            </div>
        </div>
    )
};

export { Dashboard };
