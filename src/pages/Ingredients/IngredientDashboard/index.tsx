import { InputAdornment, TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";
import { IIngrediente } from "interfaces";
import { useEffect, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";
import { IngredientService } from "services/IngredientService";

import { Dashboard } from "templates/Dashboard";
import { IngredientTable } from "../IngredientTable";

import styles from "./styles.module.css";

function IngredientDashboard() {
    document.title = "DSE - Gerenciamento de Ingredientes"

    const [ingredients, setIngredients] = useState<IIngrediente[]>([]);

    async function retrieveAllData() {
        await IngredientService.list().then((response) => {
            setIngredients(response);
        });
    };

    useEffect(() => {
        retrieveAllData();
    }, []);

    return (
        <Dashboard>
            <div className={ styles.ingredientDashboardContainer }>
                <header>
                    <h4>Ingredientes</h4>

                    <div>
                        <TextField 
                            type="text" 
                            className="me-1" 
                            label="Pesquisar ingrediente" 
                            size="small"
                            variant="filled"
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
                    <IngredientTable 
                        headers={["nome", "quantidade"]}
                        ingredients={ingredients}
                    />
                </div>
            </div>
        </Dashboard>
    )
};

export { IngredientDashboard };