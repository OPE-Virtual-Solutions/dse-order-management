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
    
    return (
        <TableContainer className={ styles.tableContainer }>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={ index }>
                                { header }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={ styles.tableBody }>
                    { products.map((product, index) => 
                        product.category.name === selectedCategory && (
                            <ProductTableRow
                                onProductSelect={openModal} 
                                key={index} 
                                product={product} 
                            />
                        )
                    )}
                </TableBody>
            </Table>

            <Dialog fullWidth maxWidth="md" open={openEditModal} onClose={closeEditModal}>
                <ProductModal categories={categories} product={selectedProduct} />
            </Dialog>
        </TableContainer>
    )
};

export { ProductManageTable };