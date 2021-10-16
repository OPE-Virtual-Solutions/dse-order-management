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
                    <span>R${ product.price }</span>

                    <p>
                        { product.ingredients.length !== 0 ? (
                            product.ingredients.map((ingredient: any, index: number) => (
                                index === product.ingredients.length - 1 ? ingredient.nome : ingredient.nome + ", "
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
                        label="Qtd."
                        defaultValue={0}
                        required

                        inputProps={{
                            style: {
                                fontSize: 13,
                                height: 10,
                            }
                        }}
                    />

                    <Button 
                        type="submit"
                        text="Adicionar ao carrinho"
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
