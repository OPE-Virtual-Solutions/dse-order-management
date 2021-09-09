import { useState } from "react";

import { 
    InputAdornment, 
    TextField 
} from "@material-ui/core";
import { Button } from "components/forms/Button";

import styles from "./styles.module.css";

import { FaSearch } from "react-icons/fa";

import { ICategoria } from "interfaces";

type Props = {
    categories: ICategoria[];
}

function ProductCategory({ categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<ICategoria>();

    function handleCategorySelect(category: ICategoria) {
        setSelectedCategory(category);
    }

    return (
        <div className={ styles.productCategoryContainer }>
            <div className={ styles.column }>
                <header>
                    <h4>Categorias</h4>

                    <form>
                        <TextField 
                            type="text" 
                            label="Pesquisar produto" 
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
                    </form>
                </header>
                
                {categories.map((category, key) => (
                    <div 
                        onClick={() => {
                            handleCategorySelect(category);
                        }} 
                        className={ styles.categoryCard }
                    >
                        <span>{ category.nome }</span>
                    </div>
                ))}
            </div>
            <div className={ styles.column }>
                { !selectedCategory && (
                    <div className="d-flex justify-content-center h-100 align-items-center">
                        <span>Nenhuma categoria selecionada</span>
                    </div>
                )}

                { selectedCategory && (
                    <form className={ styles.categoryFormContainer }>

                        <div className={ styles.categoryForm }>
                            <h4>Categoria #{ selectedCategory.id }</h4>

                            <TextField 
                                key={selectedCategory.nome}
                                name="inputName"
                                fullWidth 
                                defaultValue={selectedCategory.nome || ""} 
                                type="text" 
                                variant="filled" 
                                size="small" 
                                label="Nome da categoria" 
                            />
                        </div>

                        <footer>
                            <Button type="submit" className="me-2" text="Salvar" />
                            <Button outline text="Cancelar" />
                        </footer>
                    </form>
                )}
            </div>
        </div>
    )
};

export { ProductCategory };
