import { 
    useContext, 
    useState, 
    useEffect 
} from "react";

import styles from "./CartCard.module.css";

import { FaTrashAlt } from "react-icons/fa";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { QuantityButton } from "components/forms/QuantityButton";

import { 
    CartProduct,  
} from "interfaces";

import { CartContext } from "contexts/CartContext/CartContext";
import { currencyFormat } from "utils/currencyFormat";

type Props = {
    orderItem: CartProduct;
    showCardActions: boolean;
}

function CartCard({ orderItem, showCardActions }: Props) {
    const {
        removeFromCart,
        sumItemQuantity,
        subtractItemQuantity,
    } = useContext(CartContext);

    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        setQuantity(orderItem.quantity);
    }, []);

    function onSum() {
        sumItemQuantity(orderItem);
        setQuantity(quantity + 1);
    };

    function onSubtract() {
        subtractItemQuantity(orderItem);
        setQuantity(quantity - 1);
    }

    function onRemove() {
        setQuantity(0);
        removeFromCart(orderItem);
    }

    return (
        <div className={ styles.cardContainer }>
            <main>
                <h6>{ orderItem.product.name }</h6>
                <span>R${ currencyFormat(orderItem.product.price) } x { orderItem.quantity }</span>

                <p>
                    { orderItem.product.ingredients.length !== 0 ? (
                        orderItem.product.ingredients.map((ingredient: any, index: number) => (
                            index === orderItem.product.ingredients.length - 1 ? ingredient.name : ingredient.name + ", "
                        ))) :
                        orderItem.product.description 
                    }
                </p>
            </main>

            {showCardActions && (
                <footer>
                    <QuantityButton 
                        onSubtract={() => { onSubtract() }}
                        onSum={() => { onSum() }}
                        quantity={orderItem.quantity}
                    />
                    <Tooltip title="Remover produto do carrinho" placement="left">
                        <Button 
                            onClick={() => { onRemove() }}
                            transparent
                            icon={<FaTrashAlt size={12} />}
                        />
                    </Tooltip>
                </footer>
            )}
        </div>
    )
};

export { CartCard };
