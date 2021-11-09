import { useState, useEffect } from "react";

import styles from "./UserTable.module.css";

import { User } from "interfaces/User";
import { UserService } from "services/user.service";
import { Skeleton } from "@material-ui/lab";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaEdit } from "react-icons/fa";

function UserTable() {
    const [loading, setLoading] = useState<boolean>(true);

    const [users, setUsers] = useState<User[]>([]);

    async function retrieveData() {
        await UserService.list("funcionario").then((response) => {
            setUsers(response);
            setLoading(false);
        });
    };

    useEffect(() => {
        retrieveData();
    }, []);

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
            field: "employee",
            headerName: "Cargo",
            flex: 1,
            valueGetter: (params) => {
                let result = "";

                if (params.row.employee && params.row.employee.role) {
                    result = params.row.employee.role;
                }

                return result;
            },
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
            <Tooltip title="Editar" placement="right">
                <Button 
                    type="submit" 
                    transparent 
                    icon={<FaEdit />}
                />
            </Tooltip>
        )
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
                    style={{ width: "99%", height: 350 }}
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    loading={loading}
                    hideFooter={true}
                />
            </div>
        </div>
    )
};

export { UserTable };