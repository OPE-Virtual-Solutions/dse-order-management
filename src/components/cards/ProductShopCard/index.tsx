import styles from "./styles.module.css";

import { IProduto } from "interfaces";

import { FaShoppingBag } from "react-icons/fa";

import { TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";

type Props = {
    product: IProduto;
}

function ProductShopCard({ product }: Props) {
    return (
        <div className={ styles.cardContainer }>
            <main>
                <div className={ styles.placeholderPic }></div>

                <div className={ styles.productInfoContainer }>
                    <h5>{ product.nome }</h5>
                    <span>R${ product.preco }</span>

                    <p>
                        { product.ingredientes.map((ingredient, index) => (
                            index === product.ingredientes.length - 1 ? ingredient.nome : ingredient.nome + ", "
                        ))}
                    </p>
                </div>
            </main>

            <footer>
                <form>
                    <TextField 
                        name="inputQnt"
                        type="number" 
                        variant="outlined" 
                        size="small" 
                        label="Quantidade"
                        defaultValue={0}
                    />

                    <Button 
                        text="Adicionar ao carrinho"
                        icon={<FaShoppingBag />}
                        transparent
                    />
                </form>
            </footer>
        </div>
    )
};

export { ProductShopCard };
