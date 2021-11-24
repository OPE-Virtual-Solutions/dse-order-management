import { Dialog } from "@material-ui/core";
import { UserEdit } from "components/cases/Users/UserEdit";
import { useState } from "react";
import { Dashboard } from "templates/Dashboard";

import styles from "./Profile.module.css";

function Profile() {
    const [openModal, setOpenModal] = useState<boolean>(false);

    function onEditPress() {
        setOpenModal(true);
    };

    function handleModalClose() {
        setOpenModal(false);
    };

    return (
        <Dashboard>
            <div className={styles.container}>
                <h3>Seja bem-vindo!</h3>

                <div className={styles.nav}>
                    <button 
                        onClick={() => { onEditPress() }}
                        className={styles.link}
                    >
                        Editar perfil
                    </button>
                </div>
            </div>

            <Dialog fullWidth maxWidth="sm" open={openModal} onClose={() => { handleModalClose() }}>
                <UserEdit />
            </Dialog>
        </Dashboard>
    )
}

export { Profile };