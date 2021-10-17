import { useContext } from "react";

import { CartContext } from "contexts/CartContext/CartContext";

import { Route, Redirect } from "react-router-dom";

function OrderRoute({ component: Component, ...rest }: any) {
    const { cart } = useContext(CartContext);

    return (
        <Route 
            {...rest}

            render={(props: any) => (
                cart.length !== 0 ? 
                    <Component {...props} /> 
                : <Redirect to="order-dashboard" /> 
            )}
        /> 
    )
}

export { OrderRoute };