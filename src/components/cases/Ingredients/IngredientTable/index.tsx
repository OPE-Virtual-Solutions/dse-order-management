import { useState, useEffect} from "react";

import { 
    TableContainer,
} from "@material-ui/core";

import { Ingredient } from "interfaces";
import styles from "./IngredientTable.module.css";

import { IngredientService } from "services/ingredient.service";
import { Pagination } from "components/display/Pagination";

import { DataGrid } from "@material-ui/data-grid";

type Props = {
    ingredients: Ingredient[];
    onIngredientSelect: (ingredient: Ingredient) => void;
}

function IngredientTable({
    ingredients,
    onIngredientSelect
}: Props) {
    
    const [loading, setLoading] = useState<boolean>(true);

    const [count, setCount] = useState<number>(0);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

    const headers = [
        {
            field: "id", headerName: "ID", width: 90
        },
        {
            field: "name", headerName: "Nome do Ingrediente", flex: 1
        },
        {
            field: "quantity", headerName: "Quantidade", flex: 1
        }
    ]

    async function retrieveData() {
        await IngredientService.listByPage(1).then((response) => {
            const { list, count } = response;

            setCount(count);
            setIngredientList(list);

            setLoading(false);
        });
    }

    async function changePage(event: any) {
        setLoading(true);
        await IngredientService.listByPage(event.selected + 1).then((response) => {
            const { list } = response;

            setIngredientList(list);
            setLoading(false);
        })
    }

    async function handleCellSelection(event: any) {
        onIngredientSelect(event.row)
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <TableContainer className={ styles.tableContainer }>
            <DataGrid
                autoPageSize
                style={{ height: 400, width: "100%" }}
                rows={ingredientList}
                columns={headers}
                pageSize={5}
                rowsPerPageOptions={[5]}
                loading={loading}
                hideFooter={true}
                onCellClick={handleCellSelection}
                
            />
            <Pagination 
                pageCount={count}
                onPageChange={changePage}
            /> 
        </TableContainer>
    )
};

export { IngredientTable };