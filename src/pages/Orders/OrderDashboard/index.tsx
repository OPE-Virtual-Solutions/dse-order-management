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

import { OrderTable } from "components/cases/Orders/OrderTable";

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
                        labelList={categories.map((category) => category.nome)}
                    />
                </header>

                <main>
                    {isGridList && (
                        <div className={styles.productListContainer}>
                            { products.length > 0 && products.map((produto, index) => 
                                produto.categoria.nome === categories[selectedCategory].nome && <ProductShopCard key={index} product={produto} />
                            )}
                        </div>
                    )}

                    {!isGridList && (
                        <OrderTable 
                            headers={["Imagem", "nome", "preço", "descrição", "quantidade", "ação"]}
                            products={products}
                            selectedCategory={categories[selectedCategory].nome}
                        />
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