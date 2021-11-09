import { useEffect, useState } from "react";

import { Dialog, InputAdornment, TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";

import { FaPlus, FaSearch } from "react-icons/fa";
import { IngredientService } from "services/ingredient.service";

import { Dashboard } from "templates/Dashboard";

import { Ingredient } from "interfaces";
import { IngredientTable } from "components/cases/Ingredients/IngredientTable";
import { IngredientModal } from "components/cases/Ingredients/IngredientModal";

import styles from "./styles.module.css";
import { IngredientInstance } from "interfaces/Ingredient";
import { MaterialInputProps } from "components/forms/MaterialInput";

function IngredientDashboard() {
    document.title = "DSE - Gerenciamento de Ingredientes"

    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(IngredientInstance);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);

    async function retrieveAllData() {
        await IngredientService.list().then((response) => {
            setIngredients(response);
            setLoading(false);
        });
    };

    function handleModalOpen(modalType: "edit" | "create") {
        if (modalType === "create") {
            setSelectedIngredient(IngredientInstance);
        }

        setOpenModal(true);
    }

    function onIngredientSelect(ingredient: Ingredient) {
        setSelectedIngredient(ingredient);
        setOpenModal(true);
    }

    function handleModalClose() {
        setOpenModal(false);
    }

    useEffect(() => {
        retrieveAllData();
    }, []);

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
                            onClick={() => { handleModalOpen("create") }} 
                            outline 
                            icon={<FaPlus size={14} />} 
                            text="Adicionar" 
                            className="me-1" 
                        />
                    </div>
                </header>

                <div className={ styles.ingredientContentContainer }>
                    {!loading && (
                        <IngredientTable 
                            onIngredientSelect={onIngredientSelect}
                            ingredients={ingredients}
                        />
                    )}
                </div>
            </div>

            <Dialog maxWidth="md" open={openModal} onClose={handleModalClose}>
                <IngredientModal ingredient={selectedIngredient} />
            </Dialog>
        </Dashboard>
    )
};

export { IngredientDashboard };