import { useContext } from "react";

import { UserContext } from "contexts/UserContext/UserContext";

import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }: any) {
    const { authenticated } = useContext(UserContext);

    return (
        <Route 
            {...rest}

            render={(props: any) => (
                authenticated ? 
                    <Component {...props} /> 
                : <Redirect to="/" /> 
            )}
        /> 
    )
}

export { PrivateRoute };