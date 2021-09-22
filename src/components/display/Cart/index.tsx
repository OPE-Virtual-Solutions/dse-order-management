import { 
    useHistory,
    useLocation
} from "react-router-dom";

import { 
    categories, 
    products 
} from "pages/Products/ProductDashboard/data";

import { Button } from "components/forms/Button";
import { CartCard } from "components/cards/CartCard";

import styles from "./Cart.module.css";

type EmptyCategoryProps = {
    category: string;
}

function Cart() {
    let history = useHistory();
    const location = useLocation();

    function EmptyProductCategory({ category }: EmptyCategoryProps) {
        return (
            <div className={ styles.emptyCategoryContainer }>
                <span>Nenhum(a) { category } selecionado(a)</span>
            </div>
        )
    }

    return (
        <div className={ styles.cartContainer }>
            <div className={`${styles.listContainer} ${location.pathname === "/order" ? styles.fullContainer : styles.containerWithFooter}`}>
                <header>
                    <h4>Carrinho</h4>
                </header>

                <main>
                    {categories.map((category) => (
                        <section>
                            <h6>{ category.nome }</h6>

                            {products.map((product) => 
                                product.categoria.nome === category.nome && (<CartCard product={product} />)
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
