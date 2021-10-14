import { useEffect, useState } from "react";

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
    CircularProgress,
} from "@material-ui/core";

import { Button } from "components/forms/Button";

import { Dashboard } from "templates/Dashboard";
import { ProductModal } from "components/cases/Products/ProductModal";

import { IProduto, ICategoria } from "interfaces";

import { emptyProduct } from "interfaces/IProduto";
import { TabBar } from "components/display/TabBar";
import { ProductService } from "services/ProductServices";
import { ProductCategory } from "../ProductCategory";
import { ProductManageTable } from "components/cases/Products/ProductManageTable";
import { MaterialInputProps } from "components/forms/MaterialInput";

function ProductDashboard() {
    document.title = "DSE - Gerenciamento de Produtos"

    const [selectedCategory, setSelectedCategory] = useState(0);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);

    const [selectedProduct, setSelectedProduct] = useState<IProduto>(emptyProduct);

    const [loading, setLoading] = useState<boolean>(true);

    const [categories, setCategories] = useState<ICategoria[]>([]);
    const [products, setProducts] = useState<IProduto[]>([]);

    function handleModalOpen(modalType: "edit" | "create") {
        if (modalType === "create") {
            setSelectedProduct(emptyProduct);
        }

        setOpenModal(true);
    }

    function handleModalClose() {
        setOpenModal(false);
    }

    function manageCategoryModal() {
        setOpenCategoryModal(!openCategoryModal);
    }

    async function retrieveAllData() {
        await ProductService.getRelated().then((response) => {
            setProducts(response.produtos);
            setCategories(response.categorias);

            setLoading(false);
        });
    }

    useEffect(() => {
        retrieveAllData();
    }, []);

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
                                {...MaterialInputProps}
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
                                onClick={ () => manageCategoryModal() }
                                icon={<FaSlidersH size={14} />} 
                                text="Gerenciar Categorias" 
                                className="me-1" 
                            />
                        </div>                        
                    </div>
                    
                    {!loading && (
                        <TabBar 
                            selectedTab={ selectedCategory }
                            setSelectedTab={ setSelectedCategory }
                            labelList={categories.map((category) => category.nome)}
                        />
                    )}
                </header>

                <div className={ styles.productListContainer }>
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center">
                            <CircularProgress />
                        </div>
                    )}

                    {!loading && (
                        <ProductManageTable 
                            products={products}
                            categories={categories}
                            selectedCategory={ categories[selectedCategory].nome }
                        />
                    )}
                </div>
                
                <Dialog fullWidth maxWidth="md" open={openModal} onClose={handleModalClose}>
                    <ProductModal categories={categories} product={selectedProduct} />
                </Dialog>

                <Dialog fullWidth maxWidth="md" open={openCategoryModal} onClose={manageCategoryModal}>
                    <ProductCategory categories={categories} />
                </Dialog>
            </div>
        </Dashboard>
    )
};

export { ProductDashboard };