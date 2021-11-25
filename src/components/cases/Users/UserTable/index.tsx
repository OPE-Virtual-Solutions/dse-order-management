import { useState, useEffect, useContext } from "react";

import styles from "./UserTable.module.css";

import { User } from "interfaces/User";
import { UserService } from "services/user.service";
import { Skeleton } from "@material-ui/lab";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

import { UserContext } from "contexts/UserContext/UserContext";
import { Pagination } from "components/display/Pagination";

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
                <Tooltip title="Desativar usuário" placement="right">
                    <Button 
                        disabled={ event.row.id === user.id }
                        onClick={() => onUserSelection(event.row)}
                        type="submit" 
                        transparent 
                        icon={<FaTrash />}
                    />
                </Tooltip>
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
        </div>
    )
};

export { UserTable };