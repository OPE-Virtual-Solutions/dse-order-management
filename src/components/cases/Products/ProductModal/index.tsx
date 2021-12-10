import { useState } from "react";
import styles from "./styles.module.css";

import { Button } from "components/forms/Button";

import { 
    Product,
    Category,
    Ingredient,
    ProductPost
} from "interfaces";

import { ProductIngredientForm } from "../ProductIngredientForm";
import { ProductForm } from "../ProductForm";

import { ProductService } from "services/product.service";
import { Snackbar } from "components/display/Snackbar";

type Props = {
    product: Product;
    categories: Category[];
}

function ProductModal({ categories, product }: Props) {
    const [category, setCategory] = useState<Category>({ id: -1, name: "", active: false })
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [openSnack, setOpenSnack] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    async function createProduct(productObj: Product) {
        await ProductService.create(productObj, ingredientList).then((response) => {
            if (response.status === 200) window.location.reload();
        }).catch((error) => {
            try {
                if (error.response.status === 409) {
                    setSnackMessage(`O produto "${productObj.name}" já existe`);
                }
            } catch {
                setSnackMessage(error);
            }

            setOpenSnack(true);
        }).finally(() => {
            setLoading(false);
        });
    }

    async function updateProduct(productObj: Product) {
        await ProductService.update(product.id || 0, productObj).then((response) => {
            if (response.status === 200) window.location.reload();

            setLoading(false);
        });
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        setLoading(true);

        const _product = new Product({
            name: event.target.inputNome.value,
            price: event.target.inputPreco.value,
            category: category.id === -1 ? product.category : category,
            description: event.target.inputDescricao.value,
            quantity: event.target.inputQuantidade.value,
            active: true,
            ingredients: ingredientList,
        })

        product.id ? updateProduct(_product) : createProduct(_product);
    }

    return (
        <form onSubmit={handleSubmit} className={ styles.productEditContainer }>
            <div className={ styles.productDetails }>
                <div className={ styles.column }>
                    <ProductForm 
                        product={product} 
                        categories={categories}
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

            <Snackbar 
                open={loading}
                onClose={() => {}}
                loadingSnackbar={true}
            />

            <Snackbar 
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={snackMessage}
            />
        </form>
    )
};

export { ProductModal };
