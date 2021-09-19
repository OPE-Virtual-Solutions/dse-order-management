import { useState } from "react";

import { FaTrashAlt } from "react-icons/fa";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { QuantityButton } from "components/forms/QuantityButton";

import styles from "./CartCard.module.css";
import { IProduto } from "interfaces";

type Props = {
    product: IProduto
}

function CartCard({ product }: Props) {
    const [quantity, setQuantity] = useState<number>(1);

    function onSum() {
        setQuantity(quantity + 1);
    };

    function onSubtract() {
        if (quantity !== 1) setQuantity(quantity - 1);
    }

    return (
        <div className={ styles.cardContainer }>
            <main>
                <h6>{ product.nome }</h6>
                <span>R${ product.preco }</span>

                <p>
                    { product.ingredientes.map((ingredient, index) => (
                        index === product.ingredientes.length - 1 ? ingredient.nome : ingredient.nome + ", "
                    ))}
                </p>
            </main>
            <footer>
                <QuantityButton 
                    onSubtract={onSubtract}
                    onSum={onSum}
                    quantity={quantity}
                />
                <Tooltip title="Remover produto do carrinho" placement="left">
                    <Button 
                        transparent
                        icon={<FaTrashAlt size={17} />}
                    />
                </Tooltip>
            </footer>
        </div>
    )
};

export { CartCard };
