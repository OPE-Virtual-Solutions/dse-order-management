import { ReactNode } from "react";

import styles from "./Snackbar.module.css";

import { Snackbar as MaterialSnackbar } from "@material-ui/core";

type Props = {
    message?: ReactNode;
    open: boolean;
    onClose: () => void;
    duration?: number;
    loadingSnackbar?: boolean;
}

function Snackbar({
    message = "Hello, World!",
    open,
    onClose,
    duration = 3000,
    loadingSnackbar = false
}: Props) {

    function formatMessage() {
        return loadingSnackbar ? <><img src="assets/puff.svg"/><span>Processando...</span></> : message
    }

    return (
        <MaterialSnackbar
            open={open}
            className={styles.snackbar}
            autoHideDuration={!loadingSnackbar ? duration : null}
            onClose={onClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={formatMessage()}
        />
    )
};

export { Snackbar };