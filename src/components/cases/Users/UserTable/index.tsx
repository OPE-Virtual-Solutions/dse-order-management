import { useState, useEffect, useContext } from "react";

import styles from "./UserTable.module.css";

import { User } from "interfaces/User";
import { UserService } from "services/user.service";
import { Skeleton } from "@material-ui/lab";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

import { UserContext } from "contexts/UserContext/UserContext";
import { Pagination } from "components/display/Pagination";

import SweetAlert from 'sweetalert2';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

type Props = {
    onUserSelection: (user: User) => void;
    search: string | undefined;
}

function UserTable({
    onUserSelection,
    search
}: Props) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(true);

    const [count, setCount] = useState<number>(0);

    const [users, setUsers] = useState<User[]>([]);

    const [sucessSnack, setSuccessSnack] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    async function retrieveData() {
        await UserService.listByPage(
            "funcionario",
            1,
            search
        ).then((response) => {
            const { list, count } = response;

            setCount(count);
            setUsers(list);

            setLoading(false);
        });
    };

    useEffect(() => {
        retrieveData();
    }, [search]);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "fullName",
            headerName: "Nome completo",
            flex: 1,
        },
        {
            field: "email",
            headerName: "E-mail",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Cargo",
            flex: 1,
        },
        {
            field: "active",
            headerName: "Usuário ativo",
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
    ]

    async function handleUserActivation(user: User, active: boolean) {
        user.active = active;

        await UserService.update(user).then((response) => {
            setSnackMessage(
                active ? "Usuário reativado com sucesso!" : "Usuário desativado com sucesso!"
            );
            setSuccessSnack(true);

            setUsers(_users => {
                return _users.map((_user) => {
                    if (_user.id === user.id) _user.active = active;

                    return _user;
                })
            })
        }) ;
    }

    async function onUserActivate(user: User) {
        SweetAlert.fire({
            icon: "warning",
            title: "Aviso",
            text: `Você está prestes a reativar o usuário ${user.email} - ${user.fullName}. Seu acesso será reabilitado e ele poderá acessar o sistema novamente com base no seu cargo. Deseja continuar?`,
            confirmButtonText: "<span style='color: var(--onPrimary)'>Continuar</span>",
            confirmButtonColor: "var(--primary)",
            showCancelButton: true,
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                handleUserActivation(user, true);
            }
        });
    }

    async function onUserDeactivate(user: User) {
        SweetAlert.fire({
            icon: "warning",
            title: "Aviso",
            text: `Você está prestes a desativar o usuário ${user.email} - ${user.fullName}. O usuário terá seu acesso ao sistema revogado, impossibilitando-o de efetuar login. Deseja continuar?`,
            confirmButtonText: "<span style='color: var(--onPrimary)'>Continuar</span>",
            confirmButtonColor: "var(--primary)",
            showCancelButton: true,
            cancelButtonText: "<span style='color: #1b1b1b'>Cancelar</span>",
            cancelButtonColor: "transparent",
        }).then(async(result) => {
            if (result.isConfirmed) {
                handleUserActivation(user, false);
            }
        });
    }

    function renderActionButton(event: any) {
        return (
            <div className="d-flex align-items-center">
                <Tooltip title="Editar" placement="right">
                    <Button 
                        disabled={ event.row.id === user.id }
                        onClick={() => onUserSelection(event.row)}
                        type="submit" 
                        transparent 
                        icon={<FaEdit />}
                    />
                </Tooltip>

                {event.row.active ? (
                    <Tooltip title="Desativar usuário" placement="right">
                        <Button 
                            disabled={ event.row.id === user.id }
                            onClick={() => onUserDeactivate(event.row)}
                            type="submit" 
                            transparent 
                            icon={<FaTrash />}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip title="Reativar usuário" placement="right">
                        <Button 
                            disabled={ event.row.id === user.id }
                            onClick={() => onUserActivate(event.row)}
                            type="submit" 
                            transparent 
                            icon={<FaCheck />}
                        />
                    </Tooltip>
                )}
            </div>
        )
    }

    async function changePage(event: any) {
        const _page = event.selected + 1;
        setLoading(true);

        await UserService.listByPage("funcionario", _page, search).then((response) => {
            const { list } = response;

            setUsers(list);
            setLoading(false);
        })
    }

    if (loading) {
        return (
            <div>
                {[...Array(4)].map(() => (
                    <Skeleton height={50} />
                ))}
            </div>
        )
    }

    return (
        <div className={ styles.tableContainer }>
            <div className={ styles.dataGridContainer }>
                <DataGrid
                    autoPageSize
                    autoHeight
                    style={{ width: "99%" }}
                    rows={users}
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

            <Snackbar open={sucessSnack} autoHideDuration={4000} onClose={() => setSuccessSnack(false)}>
                <Alert severity="success">{snackMessage}</Alert>
            </Snackbar>
        </div>
    )
};

export { UserTable };