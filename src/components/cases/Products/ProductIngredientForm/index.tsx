import { useState, useEffect, SetStateAction, Dispatch } from "react";

import styles from "./styles.module.css";

import { 
    IIngrediente, 
    IProduto 
} from "interfaces";
import { ingredients } from "../ProductDashboard/data";

import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

import { FaPlus, FaTrashAlt } from "react-icons/fa";

type Props = {
    product?: IProduto;
    ingredientList: IIngrediente[];
    setIngredientList: Dispatch<SetStateAction<IIngrediente[]>>;
}

function ProductIngredientForm({ product, ingredientList, setIngredientList }: Props) {
    const [currentIngredient, setCurrentIngredient] = useState<IIngrediente>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (product?.ingredientes) setIngredientList(product.ingredientes);
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
                        if (ingredient) setCurrentIngredient(ingredient);                 
                    }}
                    options={ingredients}
                    getOptionLabel={(option: IIngrediente) => option.nome}
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
