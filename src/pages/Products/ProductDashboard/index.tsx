import { SideMenu } from "components/SideMenu";

function ProductDashboard() {
    document.title = "DSE - Gerenciamento de Produtos"

    return (
        <div className="dashboardContainer">
            <SideMenu />

            <h1>Produtos</h1>
        </div>
    )
};

export { ProductDashboard };