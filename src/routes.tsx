import {
    Route, BrowserRouter
} from "react-router-dom";

import { Login } from "pages/Login";

import { OrderDashboard } from "pages/Orders/OrderDashboard";
import { OrderBoard } from "pages/Orders/OrderBoard";
import { ProductDashboard } from "pages/Products/ProductDashboard";
import { IngredientDashboard } from "pages/Ingredients/IngredientDashboard";
import { OrderRegister } from "pages/Orders/OrderRegister";

import { OrderRoute } from "components/routes/OrderRoute";
import { UserDashboard } from "pages/Users/UserDashboard";
import { PrivateRoute } from "components/routes/PrivateRoute";
import { OrderHistory } from "pages/Orders/OrderHistory";
import { Profile } from "pages/Profile";

function Routes() {
    return (
        <BrowserRouter>
            <PrivateRoute 
                requiredRoles={["admin"]}
                component={UserDashboard} path="/users" 
            />
            <PrivateRoute 
                requiredRoles={["admin", "atendente"]}
                component={ OrderHistory }
                path="/order-history" 
            />
            <PrivateRoute 
                requiredRoles={["admin", "atendente"]}
                component={ OrderBoard } 
                path="/order-board" 
            />
            <PrivateRoute 
                requiredRoles={["admin", "atendente"]}
                component={ OrderDashboard } 
                path="/order-dashboard" 
            />
            <PrivateRoute 
                requiredRoles={["admin", "estoquista"]}
                component={ IngredientDashboard } 
                path="/ingredients" 
            />
            <PrivateRoute 
                requiredRoles={["admin", "estoquista"]}
                component={ ProductDashboard } 
                path="/products" 
            />
            <OrderRoute 
                requiredRoles={["admin", "atendente"]}
                component={ OrderRegister } 
                path="/order" 
            />
            <PrivateRoute 
                component={ Profile }
                requiredRoles={[]}
                path="/profile"
                bypassRole
            />
            <Route component={ Login } path="/" exact/>
        </BrowserRouter>
    )
};

export { Routes };