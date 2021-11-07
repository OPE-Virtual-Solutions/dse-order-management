import styles from "./OrderTable.module.css";

import { currencyFormat } from "utils/currencyFormat";

import { FaShoppingBag } from "react-icons/fa";

import { 
    Table, 
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField 
} from "@material-ui/core";
import { Button } from "components/forms/Button";
import { Tooltip } from "components/display/Tooltip";

import { Product } from "interfaces";

type Props = {
    headers: string[];
    products: Product[];
    selectedCategory: string;
}

function OrderTable({
    headers,
    products,
    selectedCategory
}: Props) {
    function renderTableRow(product: Product) {
        return (
            <TableRow className={ styles.tableRow }>
                <TableCell>
                    <div className={ styles.imgPlaceholder } />
                </TableCell>
                <TableCell >
                    { product.name }
                </TableCell>
                <TableCell>
                    R${ currencyFormat(product.price) }
                </TableCell>
                <TableCell>
                    { product.ingredients.length !== 0 ? (
                        product.ingredients.map((ingredient: any, index: number) => (
                            index === product.ingredients.length - 1 ? ingredient.name : ingredient.name + ", "
                        ))) :
                        product.description 
                    }
                </TableCell>
                <TableCell style={{ maxWidth: 100 }}>
                    <TextField 
                        type="number" 
                        id="inputQnt"
                        defaultValue={0} 
                        variant="outlined" 
                        label="Qtd."
                        size="small" 
                        inputProps={{
                            style: {
                                fontSize: 13,
                                height: 10,
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Tooltip title="Adicionar ao carrinho" placement="right">
                        <Button type="submit" transparent icon={<FaShoppingBag />}/>
                    </Tooltip>
                </TableCell>
            </TableRow>
        )
    }

    return (
        <div>
            <TableContainer style={{ overflowY: "hidden"}} className={ styles.table }>
                <Table style={{ width: "99%" }}>
                    <TableHead className={ styles.tableHeader }>
                        <TableRow>
                            { headers.map((header, index) => (
                                <TableCell key={index}>
                                    { header }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={ styles.tableBody }>
                        { products.map((product, index) => 
                            product.category.name === selectedCategory && renderTableRow(product)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

};

export { OrderTable };