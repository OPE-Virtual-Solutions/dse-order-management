import { useState } from "react";

import { Dashboard } from "templates/Dashboard";

import styles from "./styles.module.css";

import { 
    FaGripLines, 
    FaBorderAll 
} from "react-icons/fa";

import { Tooltip } from "components/display/Tooltip";
import { ProductShopCard } from "components/cards/ProductShopCard";

import { products } from "pages/Products/ProductDashboard/data";
import { Button } from "components/forms/Button";

function OrderDashboard() {
    document.title = "DSE - Pedidos"

    const [isGridList, setIsGridList] = useState<boolean>(true);

    function handleListType() {
        setIsGridList(!isGridList);
    }

    return (
        <Dashboard showCart={true}>
            <div className={styles.orderDashboardContainer}>
                {isGridList && (
                    <div className={styles.productListContainer}>
                        {products.map((produto) => (
                            <ProductShopCard product={produto} />   
                        ))}
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
            </div>
        </Dashboard>
    )
};

export { OrderDashboard };