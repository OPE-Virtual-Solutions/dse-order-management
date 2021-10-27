import { CircularProgress } from "@material-ui/core";

import styles from "./AuthLoading.module.css";

function AuthLoading() {
    return (
        <div className={ styles.loadingContainer }>
            <img src="assets/vs-logo-sm.png" alt="Logo da Virtual Solutions" />

            <CircularProgress size={28} />
        </div>
    )
};

export { AuthLoading };