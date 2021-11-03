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

function Routes() {
    return (
        <BrowserRouter>
            <PrivateRoute component={UserDashboard} path="/users" />
            <PrivateRoute component={ OrderHistory } path="/order-history" />
            <PrivateRoute component={ OrderBoard } path="/order-board" />
            <OrderRoute component={ OrderRegister } path="/order" />
            <PrivateRoute component={ OrderDashboard } path="/order-dashboard" />

            <PrivateRoute component={ IngredientDashboard } path="/ingredients" />
            <PrivateRoute component={ ProductDashboard } path="/products" />
            <Route component={ Login } path="/" exact/>
        </BrowserRouter>
    )
};

export { Routes };