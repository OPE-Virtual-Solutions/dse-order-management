import { useState, MouseEventHandler } from "react";

import { IProduto } from 'interfaces'

import styles from "./styles.module.css";

import { ProductModal } from "components/cases/Products/ProductModal";
import { Dialog } from "@material-ui/core";

import { emptyProduct } from "interfaces/IProduto";
import { currencyFormat } from "utils/currencyFormat";

type Props = {
    headers: string[];
    products: IProduto[];
    onClick?: MouseEventHandler<HTMLDivElement>;
    selectedCategory: string;
};

function ProductTable({ headers, products, selectedCategory }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<IProduto>(emptyProduct);

    const [open, setOpen] = useState<boolean>(false);

    function openEditModal(product: IProduto) {
        setSelectedProduct(product);
        setOpen(true);
    }

    function closeEditModal() {
        setOpen(false);
    }

    function renderTableRow(product: IProduto) {
        return (
            <div className={ styles.tableRowContainer }
                onClick={() => { openEditModal(product) }}
            >
                <span>{ product.nome }</span>
                <span>{ product.categoria.nome }</span>
                <span>
                    <span className="fw-bold p-0">R$</span>
                    { currencyFormat(product.preco) }
                </span>
                <span>{ product.quantidade }</span>
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
                product.categoria.nome === selectedCategory && renderTableRow(product)
            )}

            <Dialog fullWidth maxWidth="md" open={open} onClose={closeEditModal}>
                <ProductModal product={selectedProduct} />
            </Dialog>
        </div>
    )
};

export { ProductTable };
