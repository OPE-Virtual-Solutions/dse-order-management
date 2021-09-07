import { createTheme } from "@material-ui/core";

const materialTheme = createTheme({
    typography: {
        fontFamily: ["Inter"].join(","),
    },
    palette: {
        primary: {
            main: "#FFE28B"
        },
        secondary: {
            main: "#FFBF00"
        },
        text: {
            primary: "#1b1b1b",
            secondary: "#1b1b1b"
        }
    }
});

export { materialTheme }