import styles from "./ProductTableRow.module.css";

import { Product } from "interfaces";
import { 
    TableCell,
    TableRow 
} from "@material-ui/core";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";

import { FaSlidersH } from "react-icons/fa";
import { currencyFormat } from "utils/currencyFormat";

type Props = {
    product: Product;
    onProductSelect: (product: Product) => void;
}

function ProductTableRow({ 
    product,
    onProductSelect
}: Props) {
    return (
        <TableRow onClick={() => { onProductSelect(product) }} className={ styles.tableRow }>
            <TableCell>
                { product.name }
            </TableCell>
            <TableCell>
                { product.category.name }
            </TableCell>
            <TableCell>
                R${ currencyFormat(product.price) }
            </TableCell>
            <TableCell>
                { product.quantity }
            </TableCell>
            <TableCell>
                <Tooltip title="Editar produto" placement="right">
                    <Button 
                        type="submit" 
                        transparent 
                        icon={<FaSlidersH />}
                    />
                </Tooltip>
            </TableCell>
        </TableRow>
    )
};

export { ProductTableRow };