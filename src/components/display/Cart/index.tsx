import { categories, products } from "pages/Products/ProductDashboard/data";

import { CartCard } from "components/cards/CartCard";

import styles from "./Cart.module.css";

type EmptyCategoryProps = {
    category: string;
}

function Cart() {
    function EmptyProductCategory({ category }: EmptyCategoryProps) {
        return (
            <div className={ styles.emptyCategoryContainer }>
                <span>Nenhum(a) { category } selecionado(a)</span>
            </div>
        )
    }

    return (
        <div className={ styles.cartContainer }>
            <div className={ styles.listContainer }>
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

            <footer>

            </footer>
        </div>
    )
}

export { Cart };
