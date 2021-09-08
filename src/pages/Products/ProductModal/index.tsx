import styles from "./styles.module.css";

import { Button } from "components/forms/Button";

import { IProduct } from "models";
import { ProductIngredientForm } from "../ProductIngredientForm";
import { ProductForm } from "../ProductForm";

type Props = {
    product: IProduct;
}

function ProductModal({ product }: Props) {
    return (
        <form className={ styles.productEditContainer }>
            <div className={ styles.productDetails }>
                <div className={ styles.column }>
                    <ProductForm product={product} />
                </div>
                <div className={ styles.column }>
                    <ProductIngredientForm product={product} />
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
