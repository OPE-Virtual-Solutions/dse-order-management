import { useState, useEffect } from "react";

import tableStyles from "styles/Table.module.css";

import { 
    Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    TableRow,
    TableCell,
} from "@material-ui/core";

import { User } from "interfaces/User";
import { Tooltip } from "components/display/Tooltip";
import { Button } from "components/forms/Button";
import { FaSlidersH } from "react-icons/fa";
import { UserService } from "services/user.service";
import { Skeleton } from "@material-ui/lab";

function UserTable() {
    const [loading, setLoading] = useState<boolean>(true);

    const [users, setUsers] = useState<User[]>([]);

    const headers: string[] = [
        "ID",
        "Nome",
        "E-mail",
        "Cargo",
        "Ações"
    ]

    async function retrieveData() {
        await UserService.list().then((response) => {
            setUsers(response);
            setLoading(false);
        });
    };

    useEffect(() => {
        retrieveData();
    }, []);

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
        <TableContainer className={ tableStyles.tableContainer }>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>
                                { header }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={ tableStyles.tableBody }>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                { user.id }
                            </TableCell>
                            <TableCell>
                                { user.name }
                            </TableCell>
                            <TableCell>
                                { user.email }
                            </TableCell>
                            <TableCell>
                                { user.type }
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Editar usuário" placement="right">
                                    <Button 
                                        type="button"
                                        transparent
                                        icon={<FaSlidersH />}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export { UserTable };