import {
    useState
} from "react";

import { 
    useHistory,
    useLocation
} from "react-router-dom";

import { 
    categories,  
} from "pages/Products/ProductDashboard/data";

import { products as productList } from "pages/Products/ProductDashboard/data";

import { Button } from "components/forms/Button";
import { CartCard } from "components/cards/CartCard";

import styles from "./Cart.module.css";

import { FiShoppingBag } from "react-icons/fi";
import { IProduto } from "interfaces";

function Cart() {
    let history = useHistory();
    const location = useLocation();

    const [products, setProducts] = useState<IProduto[]>(productList);

    if (products.length === 0) {
        return (
            <div className={ styles.emptyCartContainer }>

                <div>
                    <FiShoppingBag size={20} />
                    <h5>Carrinho vazio</h5>
                    <span>Adicione um produto para continuar com o atendimento</span>
                </div>

            </div>
        );
    }

    return (
        <div className={ styles.cartContainer }>
            <div className={`${styles.listContainer} ${location.pathname === "/order" ? styles.fullContainer : styles.containerWithFooter}`}>
                <header>
                    <h4>Carrinho</h4>
                </header>

                <main>
                    {categories.map((category, index) => (
                        <section key={index}>
                            <h6>{ category.nome }</h6>

                            {products.map((product, index) => 
                                product.categoria.nome === category.nome && (<CartCard key={index} product={product} />)
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
                    <div>
                        <span>Total</span>
                        <span>R$19.00</span>
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
