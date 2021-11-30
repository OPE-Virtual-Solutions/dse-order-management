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
    TextField, 
    Snackbar
} from "@material-ui/core";
import { Button } from "components/forms/Button";
import { Tooltip } from "components/display/Tooltip";

import { useContext, useState } from "react";

import { Product } from "interfaces";
import { CartContext } from "contexts/CartContext/CartContext";

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
    const { addToCart } = useContext(CartContext);

    const [showSnack, setShowSnack] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    const [quantity, setQuantity] = useState<string>("");

    function handleCartAdd(product: Product) {
        const _quantity = Number(quantity);
        
        if (_quantity !== 0 && _quantity !== undefined) {
            addToCart(product, _quantity);
            setSnackMessage(`${ product.name } adicionado ao carrinho`)
        } else {
            setSnackMessage("Insira a quantidade desejável do produto")
        }
        setShowSnack(true);
    }


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
                        onChange={(event: any) => setQuantity(event?.target.value)}
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
                        <Button onClick={() => handleCartAdd(product) } transparent icon={<FaShoppingBag />}/>
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

            <Snackbar
                open={ showSnack }
                autoHideDuration={3000}
                onClose={() => { setShowSnack(false) }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ snackMessage }</span>}
            />
        </div>
    )

};

export { OrderTable };