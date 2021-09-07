import { useState } from "react";

import { 
    FaPlus, 
    FaSlidersH, 
    FaSearch 
} from "react-icons/fa"
import styles from "./styles.module.css";

import {
    AppBar,
    Tabs,
    Tab,
    InputAdornment,
    TextField,
} from "@material-ui/core";

import { SideMenu } from "components/SideMenu";
import { IconButton } from "components/forms/IconButton";

import { categories, products } from "./data";
import { Dashboard } from "templates/Dashboard";

function ProductDashboard() {
    document.title = "DSE - Gerenciamento de Produtos"

    const [selectedCategory, setSelectedCategory] = useState(0);

    function handleTabChange(event: any, category: number) {
        setSelectedCategory(category);
    }

    return (
        <Dashboard>
            <div className={ styles.productDashboardContainer }>
                <header>
                    <div>
                        <h4>Produtos</h4>

                        <div>
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

                            <IconButton outline icon={<FaPlus size={14} />} text="Adicionar" className="me-1" />
                            <IconButton icon={<FaSlidersH size={14} />} text="Gerenciar Categorias" className="me-1" />
                        </div>                        
                    </div>

                    <AppBar elevation={0} position="static">
                        <Tabs 
                            value={selectedCategory} 
                            onChange={handleTabChange}
                            className={ styles.tagsContainer }
                        >
                            { categories.map((category, key) => (
                                <Tab key={key} label={category.name} />
                            )) }
                        </Tabs>
                    </AppBar>
                </header>

                <div className={ styles.productListContainer }>
                    <div className={styles.tableHeaderContainer}>
                        <span>Nome</span>
                        <span>Categoria</span>
                        <span>Preço</span>
                        <span>Quantidade</span>
                    </div>

                    { products.map((product, key) => (
                        <div key={key} className={styles.tableCardContainer}>
                            <span>{ product.nome }</span>
                            <span>{ product.categoria }</span>
                            <span>
                                <span className="fw-bold">R$</span>
                                { product.preco }
                            </span>
                            <span>{ product.quantidade }</span>
                        </div>
                    ))}
                </div>

            </div>
        </Dashboard>
    )
};

export { ProductDashboard };