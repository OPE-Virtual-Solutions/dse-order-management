import { useState, useEffect, SetStateAction, Dispatch } from "react";

import styles from "./styles.module.css";

import { 
    Ingredient, 
    Product
} from "interfaces";
import { ingredients } from "utils/placeholderData";

import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

import { FaPlus, FaTrashAlt } from "react-icons/fa";

type Props = {
    product?: Product;
    ingredientList: Ingredient[];
    setIngredientList: Dispatch<SetStateAction<Ingredient[]>>;
}

function ProductIngredientForm({ product, ingredientList, setIngredientList }: Props) {
    const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (product?.ingredients) setIngredientList(product.ingredients);
    }, []);

    function addNewIngredient() {
        setError("");

        if (ingredientList !== undefined && currentIngredient) {
            if (ingredientList.indexOf(currentIngredient) === -1) {
                setIngredientList([...ingredientList, currentIngredient]);
            } else {
                setError("O produto já possui esse ingrediente");
            }
        }
    }

    return (
        <div>
            <h6 className="text-uppercase">Ingredientes</h6>
            { ingredientList?.map((ingrediente, key) => (
                <div key={key} className={ styles.ingredientCard }>
                    <span>
                        { ingrediente.name } ● <span className="fw-bold">Qtd.</span> { ingrediente.quantity }
                    </span>

                    <FaTrashAlt />
                </div>
            ))}

            <hr />

            <div className={ styles.ingredientAddContainer }>
                <Autocomplete 
                    fullWidth
                    onChange={(event, ingredient) => {
                        if (ingredient) setCurrentIngredient(ingredient);                 
                    }}
                    options={ingredients}
                    getOptionLabel={(option: Ingredient) => option.name }
                    renderInput={(params: any) => (
                        <TextField 
                            {...params}

                            error={error}
                            helperText={error}
                            className="mb-3" 
                            variant="outlined" 
                            size="small" 
                            label="Adicionar ingrediente" 
                        />
                    )}
                />

                <button 
                    type="button"
                    onClick={() => {
                        addNewIngredient()
                    }}
                    className={ styles.ingredientAddButton}
                >
                    <FaPlus size={12} />
                </button>
            </div>
        </div>
    )
};

export { ProductIngredientForm };
