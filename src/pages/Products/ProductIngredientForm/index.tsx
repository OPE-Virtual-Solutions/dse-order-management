import { useState, useEffect } from "react";

import styles from "./styles.module.css";

import { IIngredient, IProduct } from "models";
import { ingredients } from "../ProductDashboard/data";

import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

import { FaPlus, FaTrashAlt } from "react-icons/fa";

type Props = {
    product?: IProduct;
}

function ProductIngredientForm({ product }: Props) {
    const [ingredientList, setIngredientList] = useState<IIngredient[] | undefined>([]);
    const [newIngredient, setNewIngredient] = useState<IIngredient>();

    const [error, setError] = useState<string>("");

    useEffect(() => {
        setIngredientList(product?.ingredientes);
    }, []);

    function addNewIngredient() {
        setError("");

        if (ingredientList !== undefined && newIngredient) {
            if (ingredientList.indexOf(newIngredient) === -1) {
                setIngredientList([...ingredientList, newIngredient]);
            } else {
                setError("O produto já possui esse ingrediente");
            }
        }
    }

    return (
        <div>
            <h5 className="text-uppercase">Ingredientes</h5>
            { ingredientList?.map((ingrediente, key) => (
                <div key={key} className={ styles.ingredientCard }>
                    <span>
                        { ingrediente.nome } ● <span className="fw-bold">Qtd.</span> { ingrediente.quantidade }
                    </span>

                    <FaTrashAlt />
                </div>
            ))}

            <hr />

            <div className={ styles.ingredientAddContainer }>
                <Autocomplete 
                    fullWidth
                    onChange={(event, ingredient) => {
                        if (ingredient) setNewIngredient(ingredient);                 
                    }}
                    options={ingredients}
                    getOptionLabel={(option: IIngredient) => option.nome}
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
