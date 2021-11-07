import { useState } from "react";

import styles from "./UserDashboard.module.css";

import { UserTable } from "components/cases/Users/UserTable";
import { Dashboard } from "templates/Dashboard";

import { FaPlus, FaSearch, FaSlidersH } from "react-icons/fa";
import { Button } from "components/forms/Button";
import { Dialog } from "@material-ui/core";
import { UserForm } from "components/cases/Users/UserForm";

function UserDashboard() {
    document.title = "Usuários - Delivery System Express";

    const [openModal, setOpenModal] = useState<boolean>(false);

    function onAddButtonPress() {
        setOpenModal(true);
    }

    return (
        <Dashboard>
            <div className={styles.container}>
                <header>
                    <h5>Usuários</h5>

                    <div className="d-flex align-items-center">
                        <form className="d-flex me-3">
                            <input 
                                type="text" 
                                placeholder="Pesquisar usuário"
                                className="form-control"
                            />

                            <Button  
                                transparent 
                                icon={<FaSearch size={14} />} 
                            />
                             <Button  
                                disabled
                                transparent 
                                icon={<FaSlidersH size={14} />} 
                            />
                        </form>

                        <Button
                            onClick={() => onAddButtonPress()}
                            outline
                            icon={<FaPlus size={14} />} 
                            className="ms-1 align-self-stretch"
                            text="Adicionar" 
                        />
                    </div>        
                </header>

                <div className={styles.tableContainer}>
                    <UserTable />
                </div>

                <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => { setOpenModal(false)}}>
                    <UserForm />
                </Dialog>
            </div>
        </Dashboard>
    )
};

export { UserDashboard };