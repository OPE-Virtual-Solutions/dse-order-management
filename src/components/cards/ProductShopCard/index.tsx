import { useContext, useState } from "react";

import { 
    TextField,
    Snackbar
} from "@material-ui/core";
import { Button } from "components/forms/Button";

import { FaShoppingBag } from "react-icons/fa";

import styles from "./styles.module.css";

import { IProduto } from "interfaces";
import { OrderContext } from "contexts/OrderContext/OrderContext";

type Props = {
    product: IProduto;
}

function ProductShopCard({ product }: Props) {
    const { addToCart } = useContext(OrderContext);

    const [showSnack, setShowSnack] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    function handleCartAdd(event: any) {
        event.preventDefault();

        const productCartQuantity = Number(event.target.inputQnt.value);
        if (productCartQuantity === 0) {
            setSnackMessage("Insira a quantidade desejável do produto")
        } else {
            addToCart(product, productCartQuantity);
            setSnackMessage(`${ product.nome } adicionado ao carrinho`)
        }

        setShowSnack(true);
    }

    return (
        <div className={ styles.cardContainer }>
            <main>
                <div className={ styles.placeholderPic }></div>

                <div className={ styles.productInfoContainer }>
                    <h5>{ product.nome }</h5>
                    <span>R${ product.preco }</span>

                    <p>
                        { product.ingredientes.length !== 0 ? (
                            product.ingredientes.map((ingredient, index) => (
                                index === product.ingredientes.length - 1 ? ingredient.nome : ingredient.nome + ", "
                            ))) :
                            product.descricao 
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
                        label="Quantidade"
                        defaultValue={0}
                        required
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
