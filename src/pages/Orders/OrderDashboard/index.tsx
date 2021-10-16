import { useEffect, useState } from "react";

import { Dashboard } from "templates/Dashboard";

import styles from "./styles.module.css";

import { 
    FaGripLines, 
    FaBorderAll, 
    FaSearch
} from "react-icons/fa";
import { InputAdornment, TextField } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { Tooltip } from "components/display/Tooltip";
import { ProductShopCard } from "components/cards/ProductShopCard";
import { Button } from "components/forms/Button";
import { TabBar } from "components/display/TabBar";
import { OrderTable } from "components/cases/Orders/OrderTable";

import { 
    Product, 
    Category 
} from "interfaces";
import { ProductService } from "services/product.service";

function OrderDashboard() {
    document.title = "DSE - Pedidos"

    const [loading, setLoading] = useState<boolean>(true);

    const [isGridList, setIsGridList] = useState<boolean>(true);

    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    function handleListType() {
        setIsGridList(!isGridList);
    }

    async function retrieveData() {
        await ProductService.getProductRelatedInfo().then((response) => {
            setProducts(response.products);
            setCategories(response.categories);

            setLoading(false);
        })
    }

    useEffect(() => {
        retrieveData();
    }, [])

    return (
        <Dashboard showCart={true}>
            <div className={styles.orderDashboardContainer}>

                <header>
                    <div>
                        <h5>Atendimento ao Cliente</h5>
                        
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
                    </div>

                    <TabBar 
                        selectedTab={selectedCategory}
                        setSelectedTab={setSelectedCategory}
                        labelList={categories.map((category) => category.name )}
                        loading={loading}
                    />
                </header>

                <main>
                    {isGridList && (
                        <div className={styles.productListContainer}>
                            {loading && [...Array(4)].map(() => (
                                <Skeleton height={50} />
                            ))}

                            {!loading && products.length > 0 && products.map((produto, index) => 
                                produto.category.name === categories[selectedCategory].name && <ProductShopCard key={index} product={produto} />
                            )}
                        </div>
                    )}

                    {!isGridList && (
                        <div>
                            {loading && [...Array(4)].map(() => (
                                <Skeleton height={50} />
                            ))}

                            {!loading && (
                                <OrderTable 
                                    headers={["Imagem", "nome", "preço", "descrição", "quantidade", "ação"]}
                                    products={products}
                                    selectedCategory={ categories[selectedCategory].name }
                                />
                            )}
                        </div>
                    )}
                    
                    <div className={styles.gridButton}>
                        <Tooltip 
                            title={`Visualização em ${isGridList ? "cartões" : "tabela"}`} 
                            placement="left"
                        >
                            <Button 
                                onClick={() => { handleListType() }}
                                icon={
                                    isGridList ? <FaBorderAll /> : <FaGripLines />
                                }
                                transparent
                            />
                        </Tooltip>
                    </div>
                </main>
            </div>
        </Dashboard>
    )
};

export { OrderDashboard };