import {
    Route, BrowserRouter
} from "react-router-dom";

import { Login } from "pages/Login";

import { OrderDashboard } from "pages/Orders/OrderDashboard";
import { OrderHistory } from "pages/Orders/OrderHistory";
import { ProductDashboard } from "pages/Products/ProductDashboard";
import { IngredientDashboard } from "pages/Ingredients/IngredientDashboard";
import { OrderRegister } from "pages/Orders/OrderRegister";

function Routes() {
    return (
        <BrowserRouter>
            <Route component={ OrderHistory } path="/order-history" />
            <Route component={ OrderRegister } path="/order" />
            <Route component={ OrderDashboard } path="/order-dashboard" />
            <Route component={ IngredientDashboard } path="/ingredients" />
            <Route component={ ProductDashboard } path="/products" />
            <Route component={ Login } path="/" exact/>
        </BrowserRouter>
    )
};

export { Routes };