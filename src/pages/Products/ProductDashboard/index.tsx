import { useState } from "react";

import { 
    FaPlus, 
    FaSlidersH, 
    FaSearch 
} from "react-icons/fa"
import styles from "./styles.module.css";

import {
    InputAdornment,
    TextField,
    Dialog,
} from "@material-ui/core";

import { Button } from "components/forms/Button";

import { categories, products } from "./data";
import { Dashboard } from "templates/Dashboard";
import { ProductModal } from "components/cases/Products/ProductModal";

import { IProduto } from "interfaces";
import { ProductTable } from "components/cases/Products/ProductTable";

import { emptyProduct } from "interfaces/IProduto";
import { TabBar } from "components/display/TabBar";

function ProductDashboard() {
    document.title = "DSE - Gerenciamento de Produtos"

    const [selectedCategory, setSelectedCategory] = useState(0);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [selectedProduct, setSelectedProduct] = useState<IProduto>(emptyProduct);

    function handleTabChange(event: any, category: number) {
        setSelectedCategory(category);
    }

    function handleModalOpen(modalType: "edit" | "create") {
        if (modalType === "create") {
            setSelectedProduct(emptyProduct);
        }

        setOpenModal(true);
    }

    function handleModalClose() {
        setOpenModal(false);
    }

    return (
        <Dashboard>
            <div className={ styles.productDashboardContainer }>
                <header>
                    <div>
                        <h5>Produtos</h5>

                        <div>
                            <TextField 
                                type="text" 
                                className="me-1" 
                                label="Pesquisar produto" 
                                size="small"
                                variant="outlined"
                                InputLabelProps={{
                                    style: {
                                        fontSize: 13,
                                    }
                                }}
                                inputProps={{
                                    style: {
                                        fontSize: 15,
                                        height: 14,
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaSearch color="var(--divider)" />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button 
                                onClick={() => { handleModalOpen("create") }} 
                                outline 
                                icon={<FaPlus size={14} />} 
                                text="Adicionar" 
                                className="me-1" 
                            />
                            <Button 
                                icon={<FaSlidersH size={14} />} 
                                text="Gerenciar Categorias" 
                                className="me-1" 
                            />
                        </div>                        
                    </div>

                    <TabBar 
                        selectedTab={ selectedCategory }
                        setSelectedTab={ setSelectedCategory }
                        labelList={categories.map((category) => category.nome)}
                    />
                </header>

                <div className={ styles.productListContainer }>
                    <ProductTable 
                        headers={[
                            "Nome",
                            "Categoria",
                            "Preço",
                            "Quantidade"
                        ]} 
                        products={products} 
                        selectedCategory={ categories[selectedCategory].nome }
                    />
                </div>
                
                <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleModalClose}>
                    <ProductModal product={selectedProduct} />
                </Dialog>
            </div>
        </Dashboard>
    )
};

export { ProductDashboard };