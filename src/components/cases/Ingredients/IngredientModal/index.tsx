import { useState } from "react";

import { Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { Button } from "components/forms/Button";

import { Ingredient } from "interfaces";
import { IngredientService } from "services/ingredient.service";

import styles from "./IngredientModal.module.css";

type Props = {
    ingredient: Ingredient;
}

function IngredientModal({ ingredient }: Props) {
    const [error, setError] = useState<boolean>(false);

    async function create(_ingredient: Ingredient) {
        await IngredientService.create(_ingredient).then((response) => {
            if (response.status === 200) window.location.reload();
        }).catch((error) => {
            if (error.response.status === 409) setError(true);
        })
    }

    async function update(_ingredient: Ingredient) {
        await IngredientService.update(ingredient.id ?? 0, _ingredient).then((response) => {
            if (response.status === 200) window.location.reload();
        });
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const _ingredient: Ingredient = {
            name: event.target.inputName.value,
            quantity: event.target.inputQuantity.value,
        }

        ingredient.id !== 0 ? update(_ingredient) : create(_ingredient);
    }

    return (
        <form onSubmit={handleSubmit} className={ styles.form }>
            <div className={ styles.ingredientModalContainer }>
                { ingredient.id === 0 && ( <h5>Adicionar ingrediente</h5> )}
                { ingredient.id !== 0 && ( <h5>Ingrediente #{ ingredient.id }</h5> )}

                <div className="mb-3">
                    <TextField
                        name="inputName"
                        fullWidth
                        defaultValue={ ingredient.name } 
                        variant="outlined" size="small" label="Nome do Ingrediente"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        name="inputQuantity"
                        fullWidth
                        defaultValue={ ingredient.quantity } 
                        type="number"
                        variant="outlined" size="small" label="Quantidade"
                    />
                </div>
            </div>

            <footer>
                <Button style={{ backgroundColor: "#BD5B2D", color:"#FFF"}} type="submit" className="me-2" text="Salvar" />
                <Button outline style={{ borderColor: "#F6753B", borderWidth: 1, borderStyle: "solid" }} text="Cancelar" />
            </footer>

            <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
                <Alert severity="error">Esse produto já existe.</Alert>
            </Snackbar>
        </form>
    )
};

export { IngredientModal };