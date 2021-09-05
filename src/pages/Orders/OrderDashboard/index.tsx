import { SideMenu } from "components/SideMenu";

function OrderDashboard() {
    document.title = "DSE - Pedidos"

    return (
        <div className="dashboardContainer">
            <SideMenu />

            <h1>Pedidos</h1>
        </div>
    )
};

export { OrderDashboard };