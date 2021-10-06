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

import { IProduto } from "interfaces";

type Props = {
    headers: string[];
    products: IProduto[];
    selectedCategory: string;
}

function OrderTable({
    headers,
    products,
    selectedCategory
}: Props) {

    function renderTableRow(product: IProduto) {
        return (
            <TableRow className={ styles.tableRow }>
                <TableCell>
                    <div className={ styles.imgPlaceholder } />
                </TableCell>
                <TableCell >
                    { product.nome }
                </TableCell>
                <TableCell>
                    R${ currencyFormat(product.preco) }
                </TableCell>
                <TableCell>
                    { product.ingredientes.length !== 0 ? (
                        product.ingredientes.map((ingredient, index) => (
                            index === product.ingredientes.length - 1 ? ingredient.nome : ingredient.nome + ", "
                        ))) :
                        product.descricao 
                    }
                </TableCell>
                <TableCell style={{ maxWidth: 100 }}>
                    <TextField 
                        type="number" 
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
                        <Button transparent icon={<FaShoppingBag />}/>
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
                            product.categoria.nome === selectedCategory && renderTableRow(product)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

};

export { OrderTable };