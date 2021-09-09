import { useState, MouseEventHandler } from "react";

import { IProduto } from 'interfaces'

import styles from "./styles.module.css";

import { ProductModal } from "../ProductModal";
import { Dialog } from "@material-ui/core";

import { emptyProduct } from "interfaces/IProduto";

type Props = {
    headers: string[];
    products: IProduto[];
    onClick?: MouseEventHandler<HTMLDivElement>;
};

function ProductTable({ headers, products }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<IProduto>(emptyProduct);

    const [open, setOpen] = useState<boolean>(false);

    function openEditModal(product: IProduto) {
        setSelectedProduct(product);
        setOpen(true);
    }

    function closeEditModal() {
        setOpen(false);
    }

    return (
        <div className={ styles.tableContainer }>
            <div className={ styles.tableHeaderContainer }>
                { headers.map((header, key) => (
                    <span key={key}>{ header }</span>
                ))}
            </div>

            { products.map((product, key) => (
                <div
                    key={key}
                    className={ styles.tableRowContainer }
                    onClick={() => { openEditModal(product) }}
                >
                    <span>{ product.nome }</span>
                    <span>{ product.categoria.nome }</span>
                    <span>
                        <span className="fw-bold">R$</span>
                        { product.preco }
                    </span>
                    <span>{ product.quantidade }</span>
                </div>
            ))}

            <Dialog fullWidth maxWidth="md" open={open} onClose={closeEditModal}>
                <ProductModal product={selectedProduct} />
            </Dialog>
        </div>
    )
};

export { ProductTable };
