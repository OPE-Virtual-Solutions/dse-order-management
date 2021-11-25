import { useState, useEffect} from "react";
import { useQuery } from "utils/useQuery";

import { Ingredient } from "interfaces";
import styles from "./IngredientTable.module.css";

import { IngredientService } from "services/ingredient.service";
import { Pagination } from "components/display/Pagination";

import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaEdit } from "react-icons/fa";

type Props = {
    ingredients: Ingredient[];
    onIngredientSelect: (ingredient: Ingredient) => void;
    queryString: string | null;
}

function IngredientTable({
    ingredients,
    onIngredientSelect, 
    queryString
}: Props) {
    const query = useQuery();
    
    const [loading, setLoading] = useState<boolean>(true);

    const [count, setCount] = useState<number>(0);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

    const columns: GridColDef[] = [
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
        },
        {
            field: "action",
            headerName: "Ação",
            renderCell: renderActionButton,
            width: 90,
            headerAlign: "center",
            align: "center",
            filterable: false,
            sortable: false,
        }
    ]

    function renderActionButton(event: any) {
        return (
            <Tooltip title="Editar ingrediente" placement="right">
                <Button 
                    onClick={() => onIngredientSelect(event.row)}
                    type="submit" 
                    transparent 
                    icon={<FaEdit />}
                />
            </Tooltip>
        )
    }

    async function retrieveData() {
        await IngredientService.listByPage(
            Number(query.get("page")) || 1,
            queryString ? queryString : ""
        ).then((response) => {
            const { list, count } = response;

            setCount(count);
            setIngredientList(list);

            setLoading(false);
        });
    }

    async function changePage(event: any) {
        const _page = event.selected + 1;
        setLoading(true);

        await IngredientService.listByPage(_page).then((response) => {
            const { list } = response;
            query.set("page", _page)

            setIngredientList(list);
            setLoading(false);
        })
    }

    useEffect(() => {
        retrieveData();
    }, []);

    useEffect(() => {
        retrieveData();
    }, [queryString]);

    return (
        <div className={ styles.tableContainer }>

            <div className={ styles.dataGridContainer }>
                <DataGrid
                    autoHeight
                    style={{ width: "99%" }}
                    rows={ingredientList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    loading={loading}
                    
                    hideFooter={true}
                />
                <Pagination 
                    pageCount={count}
                    onPageChange={changePage}
                /> 
            </div>
        </div>
    )
};

export { IngredientTable };