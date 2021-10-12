
import { ReactNode } from "react";

import { Tooltip as Hint } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

type Props = {
    title: string;
    children: ReactNode;
    placement?: "left" | "top" | "right" | "bottom";
}

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#FFF",
        color: "var(--text)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        fontWeight: 600,
        border: "1px solid var(--divider)"
    }
}))(Hint);

function Tooltip({ title, children, placement = "bottom" }: Props) {
    return (
        <CustomTooltip title={title} placement={placement}>
            <div>
                { children }
            </div>
        </CustomTooltip>
    )
};

export { Tooltip };
