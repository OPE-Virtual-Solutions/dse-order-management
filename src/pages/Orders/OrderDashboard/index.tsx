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
import { FiX } from "react-icons/fi";

function OrderDashboard() {
    document.title = "DSE - Pedidos"

    const [loading, setLoading] = useState<boolean>(true);

    const [isGridList, setIsGridList] = useState<boolean>(true);

    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [search, setSearch] = useState<string>("");

    function handleListType() {
        setIsGridList(!isGridList);
    }

    async function retrieveData() {
        await ProductService.getProductRelatedInfo(true).then((response) => {
            setProducts(response.products || []);
            setCategories(response.categories || []);

            setLoading(false);
        })
    }

    async function retrieveSearchData() {
        await ProductService.list(search).then((response) => {
            setProducts(response);

            setLoading(false);
        })
    }

    function submitSearch(event: any) {
        event.preventDefault();
        setSearch(event.target.inputSearch.value);
    }

    function clearSearch() {
        setSearch("");
    }

    function renderProducts() {
        if (categories.length !== 0) {
            const filteredProducts = products.filter(product => product.category.name === categories[selectedCategory].name);
            // setFiltered(filteredProducts);
            
            if (filteredProducts.length === 0) {
                return <span>Nenhum produto encontrado</span>
            } else {
                // setHideHeader(false);

                return isGridList ? filteredProducts.map((product,index) => (
                    <ProductShopCard 
                        key={index}
                        product={product}
                    />
                )) : (
                    <OrderTable 
                        headers={["Imagem", "nome", "preço", "descrição", "quantidade", "ação"]}
                        products={filteredProducts}
                        selectedCategory={ categories[selectedCategory].name }
                    />
                )
                // return (
                //     <ProductShopCard
                //         product={handleProductSelect} 
                //         productList={filteredProducts} 
                //     />
                // )
            }
        } else {
            return <span>Nenhuma categoria registrada ou ativa. Contate o administrador do sistema.</span>
        }
    }

    // useEffect(() => {
    //     retrieveData();
    // }, [])

    useEffect(() => {
        if (search !== "") {
            retrieveSearchData();
        } else {
            retrieveData();
        }
    }, [search])

    return (
        <Dashboard showCart={true}>
            <div className={styles.orderDashboardContainer}>

                <header>
                    <div>
                        <h5>Atendimento ao Cliente</h5>
                        
                        <div className="d-flex align-items-center">
                            {search !== "" && <small className="me-3">{products.length} resultado(s) encontrado(s)</small>}
                            <form onSubmit={submitSearch} className="d-flex">
                                <input 
                                    id="inputSearch"
                                    name="inputSearch"
                                    type="text"
                                    placeholder="Pesquisar produto"
                                    className="form-control"
                                />


                                <Button 
                                    type="submit"
                                    transparent
                                    icon={<FaSearch size={14} />}
                                />

                                {search !== "" && (
                                    <Button 
                                        onClick={() => clearSearch()}
                                        transparent 
                                        icon={<FiX size={14} />} 
                                        text="Limpar"
                                    />
                                )}
                            </form>
                        </div>
                    </div>

                    <TabBar 
                        selectedTab={selectedCategory}
                        setSelectedTab={setSelectedCategory}
                        labelList={categories.length !== 0 ? categories.map((category) => category.name ) : ["Nenhuma categoria encontrada"]}
                        loading={loading}
                    />
                </header>

                <main>
                    <div className={isGridList ? styles.productListContainer : undefined}>
                        {loading && [...Array(4)].map(() => (
                            <Skeleton height={50} />
                        ))}

                        {!loading && renderProducts()}
                    </div>
                    
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