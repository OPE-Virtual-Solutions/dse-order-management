import React, { useContext } from "react";

import { UserContext } from "contexts/UserContext/UserContext";

import { Route, Redirect } from "react-router-dom";

type Props = {
    component: any;
    requiredRoles: Array<string>;
    bypassRole?: boolean;
    path: string;
}

const PrivateRoute: React.FC<Props> = props => {
    const { user, authenticated } = useContext(UserContext);

    const { component: Component, ...rest } = props;

    if (props.bypassRole) {
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

    const userHasPermission = user.role && props.requiredRoles.includes(user.role);

    return (
        <Route 
            {...rest}

            render={(props: any) => (
                (authenticated && userHasPermission) ?
                    <Component {...props} />
                : (authenticated && !userHasPermission) ?
                    <Redirect to="/profile" />
                : <Redirect to="/" />
            )}
        /> 
    )
}

export { PrivateRoute };