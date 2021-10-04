import { useContext, useState } from "react";

import { FaTrashAlt } from "react-icons/fa";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { QuantityButton } from "components/forms/QuantityButton";

import styles from "./CartCard.module.css";
import { IItemPedido } from "interfaces";
import { OrderContext } from "contexts/OrderContext/OrderContext";

type Props = {
    orderItem: IItemPedido
}

function CartCard({ orderItem }: Props) {
    const { removeFromCart } = useContext(OrderContext);

    const [quantity, setQuantity] = useState<number>(1);

    function onSum() {
        setQuantity(quantity + 1);
    };

    function onSubtract() {
        if (quantity !== 1) setQuantity(quantity - 1);
    }

    function onRemove() {
        removeFromCart(orderItem);
    }

    return (
        <div className={ styles.cardContainer }>
            <main>
                <h6>{ orderItem.produto.nome }</h6>
                <span>R${ orderItem.produto.preco }</span>

                <p>
                    { orderItem.produto.ingredientes.length !== 0 ? (
                        orderItem.produto.ingredientes.map((ingredient, index) => (
                            index === orderItem.produto.ingredientes.length - 1 ? ingredient.nome : ingredient.nome + ", "
                        ))) :
                        orderItem.produto.descricao 
                    }
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
                        onClick={() => { onRemove() }}
                        transparent
                        icon={<FaTrashAlt size={17} />}
                    />
                </Tooltip>
            </footer>
        </div>
    )
};

export { CartCard };
