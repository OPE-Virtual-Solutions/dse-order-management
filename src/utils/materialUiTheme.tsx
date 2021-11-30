import { createTheme } from "@material-ui/core";

const materialTheme = createTheme({
    typography: {
        fontFamily: ["Inter"].join(","),
    },
    palette: {
        primary: {
            main: "#F6753B"
        },
        secondary: {
            main: "#BD5B2D"
        },
        text: {
            primary: "#1b1b1b",
            secondary: "#1b1b1b"
        }
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'var(--divider)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                },
                "&::placeholder": {
                    color: "red"
                },
                color: "var(--onBackground)",
            },
        },
    }
});

export { materialTheme }