import { useState } from "react";

import { Dashboard } from "templates/Dashboard";

import styles from "./styles.module.css";

import { 
    FaGripLines, 
    FaBorderAll, 
    FaSearch
} from "react-icons/fa";
import { InputAdornment, TextField } from "@material-ui/core";

import { Tooltip } from "components/display/Tooltip";
import { ProductShopCard } from "components/cards/ProductShopCard";
import { Button } from "components/forms/Button";
import { TabBar } from "components/display/TabBar";

import { categories, products } from "pages/Products/ProductDashboard/data";

function OrderDashboard() {
    document.title = "DSE - Pedidos"

    const [isGridList, setIsGridList] = useState<boolean>(true);

    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    function handleListType() {
        setIsGridList(!isGridList);
    }

    return (
        <Dashboard showCart={true}>
            <div className={styles.orderDashboardContainer}>

                <header>
                    <div>
                        <h4>Atendimento ao Cliente</h4>
                        
                        <TextField 
                            type="text" 
                            className="me-1" 
                            label="Pesquisar produto" 
                            size="small"
                            variant="outlined"
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
                        labelList={categories.map((category) => category.nome)}
                    />
                </header>

                <main>
                    {isGridList && (
                        <div className={styles.productListContainer}>
                            { products.map((produto) => 
                                produto.categoria.nome === categories[selectedCategory].nome && <ProductShopCard product={produto} />
                            )}
                        </div>
                    )}

                    {!isGridList && (
                        <span>TODO tabela para atendimento</span>
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