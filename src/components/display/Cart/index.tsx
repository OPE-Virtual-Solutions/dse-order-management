import {
    useContext,
} from "react";

import { 
    useHistory,
    useLocation
} from "react-router-dom";

import { IItemPedido } from "interfaces";

import { Button } from "components/forms/Button";
import { CartCard } from "components/cards/CartCard";

import styles from "./Cart.module.css";

import { FiShoppingBag } from "react-icons/fi";

import { OrderContext } from "contexts/OrderContext/OrderContext";
import { categories } from "pages/Products/ProductDashboard/data";

function Cart() {
    let history = useHistory();
    const location = useLocation();

    const { cart, summary } = useContext(OrderContext);
    
    function renderCartCard(orderItem: IItemPedido) {
        return (
            <CartCard key={orderItem.id} orderItem={orderItem} />
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
                ${location.pathname === "/order" ? styles.fullContainer : styles.containerWithFooter}
            `}>
                <header>
                    <h5>Carrinho</h5>
                </header>

                <main>
                    {categories.map((category, index) => (
                        <section key={index}>
                            <h6>{ category.nome }</h6>

                            {cart.map((orderItem) => 
                                orderItem.produto.categoria.nome === category.nome && renderCartCard(orderItem)
                            )}
                        </section>
                    ))}
                </main>
            </div>
            
            { location.pathname !== "/order" && (
                <footer>
                    <div>
                        <span>Subtotal</span>
                        <span>R$19.00</span>
                    </div>
                    <div>
                        <span>Taxa</span>
                        <span>R$--</span>
                    </div>

                    {/* <hr /> */}

                    <div>
                        <span>Total</span>
                        <span>R${ summary.valor_total }</span>
                    </div>

                    <Button
                        onClick={() => history.push("/order") }
                        className="w-100 mt-3"
                        text="Continuar com o Pedido"
                    />
                </footer>
            )}
        </div>
    )
}

export { Cart };
