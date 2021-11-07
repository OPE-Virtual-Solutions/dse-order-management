import styles from "./UserDashboard.module.css";

import { UserTable } from "components/cases/Users/UserTable";
import { Dashboard } from "templates/Dashboard";
import { InputAdornment, TextField } from "@material-ui/core";
import { MaterialInputProps } from "components/forms/MaterialInput";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "components/forms/Button";

function UserDashboard() {
    return (
        <Dashboard>
            <div className={styles.container}>
                <header>
                    <h5>Usuários</h5>

                    <div>
                        <TextField 
                            type="text" 
                            className="me-1" 
                            label="Pesquisar usuário" 
                            size="small"
                            variant="outlined"
                            {...MaterialInputProps}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FaSearch color="var(--divider)" />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button  
                            outline 
                            icon={<FaPlus size={14} />} 
                            className="h-100"
                            text="Adicionar" 
                        />
                    </div>        
                </header>

                <div className={styles.tableContainer}>
                    <UserTable />
                </div>
            </div>
        </Dashboard>
    )
};

export { UserDashboard };