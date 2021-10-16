import { useState, MouseEventHandler } from "react";

import { 
    Category, 
    Product,
    EmptyProduct
} from 'interfaces'

import styles from "./styles.module.css";

import { ProductModal } from "components/cases/Products/ProductModal";
import { Dialog } from "@material-ui/core";

import { currencyFormat } from "utils/currencyFormat";
import { newCategories } from "utils/placeholderData";

type Props = {
    headers: string[];
    products: Product[];
    categories: Category[];
    onClick?: MouseEventHandler<HTMLDivElement>;
    selectedCategory: string;
};

function ProductTable({ headers, products, selectedCategory }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product>(EmptyProduct);

    const [open, setOpen] = useState<boolean>(false);

    function openEditModal(product: Product) {
        setSelectedProduct(product);
        setOpen(true);
    }

    function closeEditModal() {
        setOpen(false);
    }

    function renderTableRow(product: Product) {
        return (
            <div className={ styles.tableRowContainer }
                onClick={() => { openEditModal(product) }}
            >
                <span>{ product.name }</span>
                <span>{ product.category }</span>
                <span>
                    <span className="fw-bold p-0">R$</span>
                    { currencyFormat(product.price) }
                </span>
                <span>{ product.quantity }</span>
            </div>
        )
    }

    return (
        <div className={ styles.tableContainer }>
            <div className={ styles.tableHeaderContainer }>
                { headers.map((header, key) => (
                    <span key={key}>{ header }</span>
                ))}
            </div>

            { products.map((product, key) => 
                product.category.name === selectedCategory && renderTableRow(product)
            )}

            <Dialog fullWidth maxWidth="md" open={open} onClose={closeEditModal}>
                <ProductModal categories={newCategories} product={selectedProduct} />
            </Dialog>
        </div>
    )
};

export { ProductTable };
