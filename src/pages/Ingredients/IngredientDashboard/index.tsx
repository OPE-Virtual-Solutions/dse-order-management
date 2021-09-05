import { SideMenu } from "components/SideMenu";

function IngredientDashboard() {
    document.title = "DSE - Gerenciamento de Ingredientes"

    return (
        <div className="dashboardContainer">
            <SideMenu />

            <h1>Ingredientes</h1>
        </div>
    )
};

export { IngredientDashboard };