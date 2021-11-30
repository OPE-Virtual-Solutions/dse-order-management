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
} from "@material-ui/core";
import {
    Skeleton 
} from "@material-ui/lab";

import { Button } from "components/forms/Button";

import { Dashboard } from "templates/Dashboard";
import { ProductModal } from "components/cases/Products/ProductModal";

import { 
    Product,
    EmptyProduct,
    Category
} from "interfaces";

import { TabBar } from "components/display/TabBar";
import { ProductCategory } from "../ProductCategory";
import { ProductManageTable } from "components/cases/Products/ProductManageTable";
import { MaterialInputProps } from "components/forms/MaterialInput";
import { ProductService } from "services/product.service";
import { ProductManage } from "components/cases/Products/ProductManage";

function ProductDashboard() {
    document.title = "DSE - Gerenciamento de Produtos"

    const [selectedCategory, setSelectedCategory] = useState(0);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);

    const [selectedProduct, setSelectedProduct] = useState<Product>(EmptyProduct);

    const [loading, setLoading] = useState<boolean>(true);

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    function handleModalOpen(modalType: "edit" | "create") {
        if (modalType === "create") {
            setSelectedProduct(EmptyProduct);
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
        await ProductService.getProductRelatedInfo().then((response) => {
            setProducts(response.products);
            setCategories(response.categories);

            setLoading(false);
        });
    }

    function handleProductSelect(product: Product) {
        setSelectedProduct(product);
        setOpenModal(true);
    }

    function renderProducts() {
        const filteredProducts = products.filter(product => product.category.name === categories[selectedCategory].name);
        // setFiltered(filteredProducts);
        
        if (filteredProducts.length === 0) {
            return <span>Nenhum produto encontrado</span>
        } else {
            // setHideHeader(false);
            return (
                <ProductManage
                    onProductSelect={handleProductSelect} 
                    productList={filteredProducts} 
                />
            )
        }
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
                    

                    <TabBar 
                        selectedTab={ selectedCategory }
                        setSelectedTab={ setSelectedCategory }
                        labelList={categories.map((category) => category.name )}
                        loading={loading}
                    />
                </header>

                <div className={ styles.productListContainer }>
                    <div>
                        {loading && [...Array(4)].map(() => (
                            <Skeleton height={50} />
                        ))}

                        {!loading && renderProducts()}
                    </div>
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