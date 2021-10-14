import { MouseEventHandler } from "react";
import styles from "./ProductTableRow.module.css";

import { IProduto } from "interfaces";
import { 
    TableCell,
    TableRow 
} from "@material-ui/core";

import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";

import { FaSlidersH } from "react-icons/fa";
import { currencyFormat } from "utils/currencyFormat";

type Props = {
    product: IProduto;
    onProductSelect: (product: IProduto) => void;
}

function ProductTableRow({ 
    product,
    onProductSelect
}: Props) {
    return (
        <TableRow onClick={() => { onProductSelect(product) }} className={ styles.tableRow }>
            <TableCell>
                { product.nome }
            </TableCell>
            <TableCell>
                { product.categoria.nome }
            </TableCell>
            <TableCell>
                R${ currencyFormat(product.preco) }
            </TableCell>
            <TableCell>
                { product.quantidade }
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