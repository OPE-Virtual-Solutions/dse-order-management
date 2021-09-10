import { useState } from "react";
import styles from "./styles.module.css";

import { Button } from "components/forms/Button";

import { 
    IProduto, 
    ICategoria, 
    IIngrediente 
} from "interfaces";

import { ProductIngredientForm } from "../ProductIngredientForm";
import { ProductForm } from "../ProductForm";
import { ProductService } from "services/ProductServices";

type Props = {
    product: IProduto;
}

function ProductModal({ product }: Props) {
    const [category, setCategory] = useState<ICategoria>({ id: -1, nome: "", ativo: false })
    const [ingredientList, setIngredientList] = useState<IIngrediente[]>([]);

    async function handleSubmit(event: any) {
        const newProduct = {
            nome: event.target.inputNome.value,
            preco: event.target.inputPreco.value,
            ativo: false,
            categoria: category.id !== -1 ? category.id : product.id,
            quantidade: event.target.inputQuantidade.value,
            descricao: event.target.inputDescricao.value,
        };

        await ProductService.create(newProduct).then((response) => {
            console.log(response);
        });
    }

    return (
        <form onSubmit={handleSubmit} className={ styles.productEditContainer }>
            <div className={ styles.productDetails }>
                <div className={ styles.column }>
                    <ProductForm 
                        product={product} 
                        setCategory={setCategory}
                    />
                </div>
                <div className={ styles.column }>
                    <ProductIngredientForm 
                        ingredientList={ingredientList}
                        setIngredientList={setIngredientList}
                        product={product} 
                    />
                </div>
            </div>

            <footer>
                <Button type="submit" className="me-2" text="Salvar" />
                <Button outline text="Cancelar" />
            </footer>
        </form>
    )
};

export { ProductModal };
