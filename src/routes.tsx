import {
    Route, BrowserRouter
} from "react-router-dom";

import { Login } from "pages/Login";

import { OrderDashboard } from "pages/Orders/OrderDashboard";
import { ProductDashboard } from "pages/Products/ProductDashboard";
import { IngredientDashboard } from "pages/Ingredients/IngredientDashboard";

function Routes() {
    return (
        <BrowserRouter>
            <Route component={ OrderDashboard } path="/orders" />
            <Route component={ IngredientDashboard } path="/ingredients" />
            <Route component={ ProductDashboard } path="/products" />
            <Route component={ Login } path="/" exact/>
        </BrowserRouter>
    )
};

export { Routes };