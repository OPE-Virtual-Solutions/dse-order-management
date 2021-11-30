import { useState } from "react";
import styles from "./ProductManageTable.module.css";

import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog,
} from "@material-ui/core";

import { 
    Category, 
    Product,
    EmptyProduct,
} from "interfaces";
import { ProductTableRow } from "./ProductTableRow";
import { ProductModal } from "components/cases/Products/ProductModal";

type Props = {
    products: Product[];
    categories: Category[];
    selectedCategory: string;
}

function ProductManageTable({
    products,
    categories,
    selectedCategory
}: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product>(EmptyProduct);

    const [hideHeader, setHideHeader] = useState<boolean>(false);

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const headers: string[] = [
        "Nome",
        "Categoria",
        "Preço",
        "Quantidade",
        "Ação"
    ];

    function openModal(product: Product) {
        setSelectedProduct(product);
        setOpenEditModal(true);
    }

    function closeEditModal() {
        setOpenEditModal(false);
    }

    function renderProducts() {
        const filteredProducts = products.filter(product => product.category.name === selectedCategory);
        // setFiltered(filteredProducts);
        
        if (filteredProducts.length === 0) {
            // setHideHeader(true);
            return <span>Nenhum produto encontrado</span>
        } else {
            // setHideHeader(false);
            return filteredProducts.map((product, index) => (
                <ProductTableRow
                    onProductSelect={openModal} 
                    key={index} 
                    product={product} 
                />
            ))
        }
    }
    
    return (
        <TableContainer className={ styles.tableContainer }>
            <Table>
                {!hideHeader && (
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={ index }>
                                    { header }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                )}
                <TableBody className={ styles.tableBody }>
                    { renderProducts() }
                </TableBody>
            </Table>

            <Dialog fullWidth maxWidth="md" open={openEditModal} onClose={closeEditModal}>
                <ProductModal categories={categories} product={selectedProduct} />
            </Dialog>
        </TableContainer>
    )
};

export { ProductManageTable };