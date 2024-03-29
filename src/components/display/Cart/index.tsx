import {
    useContext,
} from "react";

import { 
    useHistory,
    useLocation
} from "react-router-dom";

import { 
    CartProduct 
} from "interfaces";

import { Button } from "components/forms/Button";
import { CartCard } from "components/cards/CartCard";

import styles from "./Cart.module.css";

import { FiShoppingBag } from "react-icons/fi";

import { CartContext } from "contexts/CartContext/CartContext";
import { currencyFormat } from "utils/currencyFormat";

export type CartProps = {
    showCardActions?: boolean;
}

function Cart({ showCardActions = true }: CartProps) {
    let history = useHistory();
    const location = useLocation();

    const { cart, order } = useContext(CartContext);
    
    function renderCartCard(orderItem: CartProduct) {
        return (
            <CartCard 
                key={orderItem.id} 
                orderItem={orderItem} 
                showCardActions={showCardActions}
            />
        )
    }

    if (cart.length === 0) {
        return (
            <div className={ styles.emptyCartContainer }>
                <div>
                    <FiShoppingBag size={18} />
                    <h6>Carrinho vazio</h6>
                    <span>Adicione um produto para continuar com o atendimento</span>
                </div>
            </div>
        );
    }

    return (
        <div className={ styles.cartContainer }>
            <div className={`
                ${styles.listContainer} 
                ${styles.containerWithFooter}
            `}>
                <header>
                    <h5>Carrinho</h5>

                    <div>
                        <span>{ cart.length }</span>
                    </div>
                </header>

                <main>
                    <section>
                        {cart.map((orderItem) => 
                            renderCartCard(orderItem)
                        )}
                    </section>
                </main>
            </div>
            
            <footer>
                <h6>Resumo do pedido</h6>
                {/* <div>
                    <span>Subtotal</span>
                    <span>R$--</span>
                </div>
                <div>
                    <span>Taxa</span>
                    <span>R$--</span>
                </div> */}

                <div>
                    <span>Total</span>
                    <span>R${ currencyFormat(order.totalPrice) }</span>
                </div>

                { location.pathname !== "/order" && (
                    <Button
                        onClick={() => history.push("/order") }
                        className="w-100 mt-3"
                        text="Continuar com o Pedido"
                    />
                )}
  
                { location.pathname === "/order" && (
                    <Button
                        onClick={() => history.goBack() }
                        className="w-100 mt-3"
                        text="Voltar para a tela principal"
                    />
                )}
            </footer>
        </div>
    )
}

export { Cart };
