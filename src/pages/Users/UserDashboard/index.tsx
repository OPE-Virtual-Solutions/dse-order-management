import { useState } from "react";

import styles from "./UserDashboard.module.css";

import { UserTable } from "components/cases/Users/UserTable";
import { Dashboard } from "templates/Dashboard";

import { FaPlus, FaSearch, FaSlidersH } from "react-icons/fa";
import { Button } from "components/forms/Button";
import { Dialog } from "@material-ui/core";
import { UserForm } from "components/cases/Users/UserForm";

import { User } from "interfaces/User";
import { UserInstance } from "contexts/UserContext/IUserContext";
import { FiX } from "react-icons/fi";

function UserDashboard() {
    document.title = "Usuários - Delivery System Express";

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [user, setUser] = useState<User>(UserInstance);

    const [search, setSearch] = useState<string>("");

    function onAddButtonPress() {
        setOpenModal(true);
    }

    function onUserSelection(user: User) {
        setUser(user);
        setOpenModal(true);
    }

    function handleModalClose() {
        setUser(UserInstance);
        setOpenModal(false);
    }

    function submitSearch(event: any) {
        event.preventDefault();
        setSearch(event.target.inputSearch.value);
    }

    function clearSearch() {
        setSearch("");
    }

    return (
        <Dashboard>
            <div className={styles.container}>
                <header>
                    <h5>Usuários</h5>

                    <div className="d-flex align-items-center">
                        <form onSubmit={submitSearch} className="d-flex me-3">
                            <input 
                                type="text" 
                                id="inputSearch"
                                name="inputSearch"
                                placeholder="Pesquisar usuário"
                                className="form-control"
                            />

                            <Button  
                                type="submit"
                                transparent 
                                icon={<FaSearch size={14} />} 
                            />

                            {search !== "" && (
                                <Button 
                                    onClick={() => clearSearch()}
                                    transparent 
                                    icon={<FiX size={14} />} 
                                    text="Limpar"
                                />
                            )}
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
                    <UserTable
                        search={search} 
                        onUserSelection={onUserSelection} 
                    />
                </div>

                <Dialog fullWidth maxWidth="md" open={openModal} onClose={() => { handleModalClose() }}>
                    <UserForm user={user}/>
                </Dialog>
            </div>
        </Dashboard>
    )
};

export { UserDashboard };