import { 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Dialog,
} from "@material-ui/core";

import { Ingredient } from "interfaces";
import styles from "./IngredientTable.module.css";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaSlidersH } from "react-icons/fa";

type Props = {
    ingredients: Ingredient[];
    onIngredientSelect: (ingredient: Ingredient) => void;
}

function IngredientTable({
    ingredients,
    onIngredientSelect
}: Props) {
    const headers: string[] = [
        "Nome",
        "Quantidade",
        "Ação"
    ];

    return (
        <TableContainer className={ styles.tableContainer }>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={ index }>
                                { header }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={ styles.tableBody }>
                    {ingredients.map((ingredient, index) => (
                        <TableRow onClick={() => { onIngredientSelect(ingredient)} } className={ styles.tableRow }>
                            <TableCell>
                                { ingredient.name }
                            </TableCell>
                            <TableCell>
                                { ingredient.quantity }
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Editar ingrediente" placement="right">
                                    <Button 
                                        type="submit" 
                                        transparent 
                                        icon={<FaSlidersH />}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export { IngredientTable };