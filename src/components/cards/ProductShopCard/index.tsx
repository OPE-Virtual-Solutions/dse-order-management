import { useContext, useState } from "react";

import { 
    TextField,
    Snackbar
} from "@material-ui/core";
import { Button } from "components/forms/Button";

import { FaShoppingBag } from "react-icons/fa";

import styles from "./styles.module.css";

import { Product } from "interfaces";

import { CartContext } from "contexts/CartContext/CartContext";
import { currencyFormat } from "utils/currencyFormat";

type Props = {
    product: Product;
}

function ProductShopCard({ product }: Props) {
    const { addToCart } = useContext(CartContext);

    const [showSnack, setShowSnack] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    function handleCartAdd(event: any) {
        event.preventDefault();

        const productCartQuantity = Number(event.target.inputQnt.value);
        if (productCartQuantity === 0) {
            setSnackMessage("Insira a quantidade desejável do produto")
        } else {
            addToCart(product, productCartQuantity);
            product.quantity -= productCartQuantity;
            setSnackMessage(`${ product.name } adicionado ao carrinho`)
        }

        setShowSnack(true);
    }

    return (
        <div className={ styles.cardContainer }>
            <main>
                <div className={ styles.placeholderPic }></div>

                <div className={ styles.productInfoContainer }>
                    <h5>{ product.name }</h5>
                    <span>R${ currencyFormat(product.price) }</span>

                    <p>
                        { product.ingredients.length !== 0 ? (
                            product.ingredients.map((ingredient: any, index: number) => (
                                index === product.ingredients.length - 1 ? ingredient.name : ingredient.name + ", "
                            ))) :
                            product.description 
                        }
                    </p>
                </div>
            </main>

            <footer>
                <form onSubmit={handleCartAdd}>
                    <TextField 
                        id="inputProductQnt"
                        name="inputQnt"
                        type="number" 
                        variant="outlined" 
                        size="small" 
                        disabled={product.quantity === 0}
                        label="Qtd."
                        defaultValue={0}
                        required
                        onInput = {(e: any) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12);
                            e.target.value = Math.min(parseInt(e.target.value), product.quantity).toString().slice(0,12)
                        }}
                        inputProps={{
                            style: {
                                fontSize: 13,
                                height: 10,
                            },
                            minLength: 0,
                        }}
                    />

                    <Button 
                        disabled={product.quantity === 0}
                        type="submit"
                        text={`${ product.quantity === 0 ? "Todos vendidos" : "Adicionar ao carrinho" }`}
                        icon={<FaShoppingBag />}
                        transparent
                    />
                </form>
            </footer>

            <Snackbar
                open={ showSnack }
                autoHideDuration={3000}
                onClose={() => { setShowSnack(false) }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ snackMessage }</span>}
            />
        </div>
    )
};

export { ProductShopCard };
