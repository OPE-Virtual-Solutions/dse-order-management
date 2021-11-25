import { useEffect, useState } from "react";
import { useQuery } from "utils/useQuery";

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

import { FiX } from "react-icons/fi";

function IngredientDashboard() {
    document.title = "DSE - Gerenciamento de Ingredientes"

    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(IngredientInstance);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");

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

    function submitSearch(event: any) {
        event.preventDefault();

        setSearch(event.target.inputSearch.value);
    }

    function clearSearch() {
        setSearch("");
    }

    return (
        <Dashboard>
            <div className={ styles.ingredientDashboardContainer }>
                <header>
                    <h5>Ingredientes</h5>

                    <div className="d-flex align-items-center">
                        <form onSubmit={submitSearch} className="d-flex me-3">
                            <input 
                                type="text"
                                id="inputSearch"
                                name="inputSearch" 
                                placeholder="Pesquisar ingrediente"
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
                            onClick={() => { handleModalOpen("create") }} 
                            outline 
                            icon={<FaPlus size={14} />} 
                            text="Adicionar" 
                            className="ms-1 align-self-stretch" 
                        />
                    </div>
                </header>

                <div className={ styles.ingredientContentContainer }>                    
                    <IngredientTable 
                        queryString={search}
                        onIngredientSelect={onIngredientSelect}
                        ingredients={ingredients}
                    />
                </div>
            </div>

            <Dialog maxWidth="md" open={openModal} onClose={handleModalClose}>
                <IngredientModal ingredient={selectedIngredient} />
            </Dialog>
        </Dashboard>
    )
};

export { IngredientDashboard };