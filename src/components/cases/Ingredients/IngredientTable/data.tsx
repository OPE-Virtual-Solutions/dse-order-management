import { GridColDef } from "@material-ui/data-grid";

export const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },
    {
        field: "name",
        headerName: "Nome do Ingrediente",
        flex: 1
    },
    {
        field: "quantity",
        headerName: "Quantidade",
        flex: 1,
        editable: true,
    },
    {
        field: "id",
        headerName: "Ação",
        
    }
]