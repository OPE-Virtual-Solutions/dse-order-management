import { useState } from "react";

import { DataGrid, GridColDef, GridValueFormatterParams } from "@material-ui/data-grid";

import { Product } from "interfaces";

import styles from "./ProductManage.module.css";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { currencyFormat } from "utils/currencyFormat";
import { ProductService } from "services/product.service";

import Alert from 'sweetalert2';

type Props = {
    productList: Product[];
    onProductSelect: (product: Product) => void;
}

function ProductManage({
    productList,
    onProductSelect,
}: Props) {
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "name",
            headerName: "Nome do Produto",
            flex: 1
        },
        {
            field: "category",
            headerName: "Categoria",
            flex: 1,
            valueGetter: (params) => {
                return params.row.category.name
            }
        },
        {
            field: "price",
            headerName: "Preço",
            flex: 1,
            valueFormatter: (data: GridValueFormatterParams) => {
                if (data.value) return `R$${currencyFormat(Number(data.value))}`
            }
        },
        {
            field: "quantity",
            headerName: "Quantidade",
            flex: 1
        },
        {
            field: "active",
            headerName: "Produto ativo",
            flex: 1,
            type: "boolean"
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
    ];

    async function activateProduct(product: Product) {
        Alert.fire({
            icon: "warning",
            title: "Aviso",
            text: `Você está prestes a reativar o produto ${product.name} #${product.id}. O produto voltará para a aba de atendimentos e estará disponível para a adição em novos pedidos. Certifique-se de que os dados importantes (preço e quantidade) estejam corretos.`,
            confirmButtonText: "<span style='color: var(--onPrimary)'>Continuar</span>",
            confirmButtonColor: "var(--primary)",
            showCancelButton: true,
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                product.active = false;
        
                await ProductService.update(product.id, product).then((response) => {
                    if (response.status) { console.log("Deactivated") }
                });
            }
        });
    }

    async function deactivateProduct(product: Product) {
        Alert.fire({
            icon: "warning",
            title: "Aviso",
            text: `Você está prestes a desativar o produto ${product.name} #${product.id}. Isso irá impossibilitar de inclui-lo em novos pedidos e irá removê-lo da página de atendimento (carrinhos atuais não serão afetados). Deseja continuar?`,
            confirmButtonText: "<span style='color: var(--onPrimary)'>Sim</span>",
            confirmButtonColor: "var(--primary)",
            showCancelButton: true,
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                product.active = false;
        
                await ProductService.update(product.id, product).then((response) => {
                    if (response.status) { console.log("Deactivated") }
                });
            }
        });
    }

    function renderActionButton(event: any) {
        return (
            <div className="d-flex align-items-center">
                <Tooltip title="Editar produto" placement="right">
                    <Button 
                        onClick={() => onProductSelect(event.row)}
                        transparent
                        icon={<FaEdit />}
                    />
                </Tooltip>

                {event.row.active && (
                    <Tooltip title="Desativar produto" placement="right">
                        <Button 
                            onClick={() => deactivateProduct(event.row)}
                            transparent
                            icon={<FaTrash />}
                        />
                    </Tooltip>
                )}

                {!event.row.active && (
                    <Tooltip title="Reativar produto" placement="right">
                        <Button 
                            onClick={() => activateProduct(event.row)}
                            transparent
                            icon={<FaCheck />}
                        />
                    </Tooltip>
                )}
            </div>
        )
    }

    return (
        <div>
            <div>
                <DataGrid 
                    autoHeight 
                    rows={productList}
                    columns={columns}
                    hideFooter={true}
                />
            </div>
        </div>
    )
}

export { ProductManage };