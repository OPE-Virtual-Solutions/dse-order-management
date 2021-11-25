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
import { FiX } from "react-icons/fi";

import Alert from 'sweetalert2';

type Props = {
    product: Product;
    onProductSelect: (product: Product) => void;
}

function ProductTableRow({ 
    product,
    onProductSelect
}: Props) {
    function handleProductDeactivation() {
        Alert.fire({
            icon: "warning",
            title: "Aviso",
            text: `Você está prestes a desativar o produto ${product.name} #${product.id}. Isso irá impossibilitar de inclui-lo em novos pedidos e irá removê-lo da página de atendimento (carrinhos atuais não serão afetados). Deseja continuar?`,
            confirmButtonText: "<span style='color: var(--onPrimary)'>Sim</span>",
            confirmButtonColor: "var(--primary)",
            showCancelButton: true,
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then((result) => {
            
        });
    }

    return (
        <TableRow className={ styles.tableRow }>
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
            <TableCell className="d-flex align-items-center">
                <Tooltip title="Editar produto" placement="right">
                    <Button 
                        onClick={() => { onProductSelect(product) }}
                        transparent 
                        icon={<FaSlidersH />}
                    />
                </Tooltip>

                { product.active && (
                    <Tooltip title="Desativar produto" placement="right">
                        <Button
                            onClick={() => handleProductDeactivation()} 
                            transparent 
                            icon={<FiX />}
                        />
                    </Tooltip>
                )}

                {!product.active && (
                    <Tooltip title="Reativar produto" placement="right">
                        <Button
                            onClick={() => handleProductDeactivation()} 
                            transparent 
                            icon={<FiX />}
                        />
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    )
};

export { ProductTableRow };