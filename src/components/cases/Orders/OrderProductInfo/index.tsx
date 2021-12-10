import styles from "./OrderProductInfo.module.css";

import { CartProduct } from "interfaces";

type Props = {
    cartProduct: CartProduct;
}

function OrderProductInfo({ cartProduct }: Props) {
    const product = cartProduct.product;

    return (
        <div className={styles.container}>
            <p>
                { product.name } ● <span>Qtd.</span> { cartProduct.quantity } 
            </p>
{/* 
            <div>
                {product.ingredients.length !== 0 && (
                    <span>
                        Ver ingredientes
                    </span>
                )}
            </div> */}
        </div>
    )
};

export { OrderProductInfo };