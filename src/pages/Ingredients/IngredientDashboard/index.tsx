import { InputAdornment, TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";

import { FaPlus, FaSearch } from "react-icons/fa";

import { Dashboard } from "templates/Dashboard";

import styles from "./styles.module.css";

function IngredientDashboard() {
    document.title = "DSE - Gerenciamento de Ingredientes"

    return (
        <Dashboard>
            <div className={ styles.ingredientDashboardContainer }>
                <header>
                    <h5>Ingredientes</h5>

                    <div>
                        <TextField 
                            type="text" 
                            className="me-1" 
                            label="Pesquisar ingrediente" 
                            size="small"
                            variant="outlined"
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
                            text="Adicionar" 
                            className="me-1" 
                        />
                    </div>
                </header>

                <div className={ styles.ingredientContentContainer }>
                    <span>abc</span>
                </div>
            </div>
        </Dashboard>
    )
};

export { IngredientDashboard };