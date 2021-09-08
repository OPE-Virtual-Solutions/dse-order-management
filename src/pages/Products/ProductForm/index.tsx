import styles from "./styles.module.css";

import { InputAdornment, TextField } from "@material-ui/core";
import { IProduct } from "models";

type Props = {
    product: IProduct;
}

function ProductForm({ product }: Props) {
    return (
        <div className={ styles.productFormContainer }>
            { product.id === 0 && ( <h4>Adicionar produto</h4> )}
            { product.id !== 0 && ( <h4>Produto #{ product.id }</h4> )}

            <div className="mb-3">
                <TextField
                    name="inputNome"
                    fullWidth
                    defaultValue={ product.nome } 
                    variant="filled" size="small" label="Nome do Produto"
                />
            </div>
            <div className="mb-3">
                <TextField 
                    name="inputPreco"
                    fullWidth
                    type="number" 
                    variant="filled" 
                    size="small" 
                    label="Preço"
                    defaultValue={product.preco}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className="fw-bold">R$</span>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className="mb-3">
                <TextField 
                    name="inputQuantidade"
                    fullWidth 
                    defaultValue={product.quantidade} 
                    type="number" 
                    variant="filled" 
                    size="small" 
                    label="Quantidade" 
                />
            </div>
                    
            <TextField 
                name="inputDescricao"
                multiline 
                rows={4} 
                fullWidth 
                type="number" 
                variant="filled" 
                size="small" 
                label="Descrição" 
            />
        </div>
    )
}

export { ProductForm };