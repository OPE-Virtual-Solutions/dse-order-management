import {
    Route, BrowserRouter
} from "react-router-dom";

import { Login } from "./pages/Login";

function Routes() {
    return (
        <BrowserRouter>
            <Route component={ Login } path="/" exact/>
        </BrowserRouter>
    )
};

export { Routes };