import { useState } from "react";

import { 
    InputAdornment, 
    TextField 
} from "@material-ui/core";
import { Button } from "components/forms/Button";

import styles from "./styles.module.css";

import { FaSearch } from "react-icons/fa";

import { 
    ICategoria, 
} from "interfaces";
import { MaterialInputProps } from "components/forms/MaterialInput";

type Props = {
    categories: ICategoria[];
}

const EmptyCategoria: ICategoria = {
    id: -1,
    nome: "",
    ativo: false
}

function ProductCategory({ categories }: Props) {
    const [showNewForm, setShowNewForm] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategoria>(EmptyCategoria);

    function handleCategorySelect(category: ICategoria) {
        setShowNewForm(false);
        setSelectedCategory(category);
    };

    function handleNewCategoryClick() {
        setSelectedCategory(EmptyCategoria);
        setShowNewForm(true);
    };

    return (
        <div className={ styles.productCategoryContainer }>
            <div className={ styles.column }>
                <header>
                    <h4>Categorias</h4>

                    <form>
                        <TextField 
                            type="text" 
                            label="Pesquisar categoria" 
                            size="small"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FaSearch color="var(--divider)" />
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: 13,
                                }
                            }}
                            inputProps={{
                                style: {
                                    fontSize: 15,
                                    height: 14,
                                }
                            }}
                        />
                    </form>
                </header>
                
                <div onClick={() => { handleNewCategoryClick() }} className={ styles.addNewCategory }>
                    <span>Adicionar nova categoria</span>
                </div>
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
                { selectedCategory.id === -1 && !showNewForm && (
                    <div className="d-flex justify-content-center h-100 align-items-center">
                        <span>Nenhuma categoria selecionada</span>
                    </div>
                )}

                { (selectedCategory.id !== -1 || showNewForm) && (
                    <form className={ styles.categoryFormContainer }>
                        <div className={ styles.categoryForm }>
                            <h4>
                                { selectedCategory.id === -1 ? "Nova categoria" : `Categoria #${ selectedCategory.id }` }
                            </h4>

                            <TextField 
                                key={selectedCategory.nome}
                                name="inputName"
                                fullWidth 
                                defaultValue={selectedCategory.nome || ""} 
                                type="text" 
                                variant="outlined" 
                                size="small" 
                                label="Nome da categoria" 
                                {...MaterialInputProps}
                                className="mt-3"
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
