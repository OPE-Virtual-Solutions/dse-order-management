import styles from "./OrderIngredientModal.module.css";

import { CartProduct, Ingredient } from "interfaces";

type Props = {
    cartProduct: CartProduct;
}

function OrderIngredientModal({ cartProduct }: Props) {
    const ingredients = cartProduct.product.ingredients;

    return (
        <div className={ styles.modalContainer }>
            <header>
                <h5>Ingredientes</h5>
                <span>do produto { cartProduct.product.name }</span>
            </header>

            <ul>
                {ingredients.map((ingredient: Ingredient, index: number) => (
                    <li key={index}>{ ingredient.name }</li>
                ))}
            </ul>
        </div>
    )
};

export { OrderIngredientModal };