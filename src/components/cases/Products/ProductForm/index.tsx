import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./styles.module.css";

import { InputAdornment, TextField } from "@material-ui/core";
import { 
    Product, 
    Category 
} from "interfaces";

import { Autocomplete } from "@material-ui/lab";

type Props = {
    product: Product;
    categories: Category[];
    setCategory: Dispatch<SetStateAction<Category>>;
}

function ProductForm({ product, categories, setCategory }: Props) {

    return (
        <div className={ styles.productFormContainer }>
            { product.id === 0 && ( <h5>Adicionar produto</h5> )}
            { product.id !== 0 && ( <h5>Produto #{ product.id }</h5> )}

            <div className="mb-3">
                <TextField
                    name="inputNome"
                    fullWidth
                    defaultValue={ product.name } 
                    variant="outlined" size="small" label="Nome do Produto"

                />
            </div>
            <div className="mb-3 d-flex">
                <TextField 
                    name="inputPreco"
                    fullWidth
                    type="number" 
                    variant="outlined" 
                    size="small" 
                    label="Preço"
                    defaultValue={ product.price }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className="fw-bold">R$</span>
                            </InputAdornment>
                        )
                    }}

                    style={{ marginRight: 10 }}
                />

                <TextField 
                    name="inputQuantidade"
                    fullWidth 
                    defaultValue={product.quantity } 
                    type="number" 
                    variant="outlined" 
                    size="small" 
                    label="Quantidade" 

                />
            </div>
            <div className="mb-3">
                <Autocomplete 
                    fullWidth
                    onChange={(event, category) => {
                        if (category) setCategory(category)   
                    }}
                    options={categories}
                    getOptionLabel={(option: Category) => option.name }
                    renderInput={(params: any) => (
                        <TextField 
                            {...params}

                            variant="outlined" 
                            size="small" 
                            label="Categoria" 
                        />
                    )}

                />
            </div>
                    
            <TextField 
                name="inputDescricao"
                multiline 
                rows={4} 
                fullWidth 
                type="number" 
                variant="outlined" 
                size="small" 
                label="Descrição" 
                defaultValue={ product.description }
            />
        </div>
    )
}

export { ProductForm };