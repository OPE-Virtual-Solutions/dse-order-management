import { ReactNode } from "react";

import { NavLink as Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";

const NavTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#FFF",
        color: "var(--text)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(13),
        fontWeight: 600,
        border: "1px solid var(--divider)"
    }
}))(Tooltip);

type Props = {
    title: string;
    path: string;
    children: ReactNode;
}

function NavLink({
    title,
    path,
    children
}: Props) {
    return (
        <NavTooltip title={title} placement="right">
            <div>
                <Link 
                    exact 
                    to={path} 
                    className="navLink"
                    activeStyle={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--onSecondary)"
                    }}
                >
                    { children }
                </Link>
            </div>
        </NavTooltip>
    )
};

export { NavLink };
