import { useEffect, useState } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Button } from "components/forms/Button";

import { User, UserPost } from "interfaces/User";

import { FaInfo } from "react-icons/fa";

import generator from "generate-password";

import { 
    UserRoleProp, 
    UserTypeProp,
    UserTypes,
    UserRoles
} from "./data";

import styles from "./UserForm.module.css";
import { UserService } from "services/user.service";

type Props = {
    user: User;
}

function UserForm({ user }: Props) {
    const [userType, setUserType] = useState<UserTypeProp | null>(UserTypes[1]);
    const [role, setRole] = useState<UserRoleProp | null>();

    const [password, setPassword] = useState<string>("");

    async function createUser(form: any) {
        const _password = user.id === -1 ? { password: password } : null;

        const _user: User = {
            fullName: form.inputName.value,
            email: form.inputEmail.value,
            type: userType?.value || "funcionario",
            ..._password,
            role: userType && userType.value === "funcionario" ? role?.role : undefined,
            phone: userType && userType.value === "cliente" ? form.inputPhone.value : undefined,
            id: -1,
            active: true,
            setPassword: () => {}
        }

        await UserService.create(_user).then((response) => {
            if (response.status) window.location.reload();
        }).catch((error) => {
            console.log(error.response);
        });
    };

    async function updateUser(form: any) {
        const _user: User = {
            fullName: form.inputName.value,
            email: form.inputEmail.value,
            type: userType?.value || "funcionario",
            role: userType && userType.value === "funcionario" ? role?.role : undefined,
            phone: userType && userType.value === "cliente" ? form.inputPhone.value : undefined,
            id: user.id,
            active: true,
            setPassword: () => {}
        }

        await UserService.update(_user).then((response) => {
            if (response.status) window.location.reload();
        }).catch((error) => {
            console.log(error.response);
        });
    }

    async function handleFormSubmit(event: any) {
        event.preventDefault();

        const form = event.target;
        
        user.id === -1 ? createUser(form) : updateUser(form);
    }

    function getUserRole() {
        return UserRoles.filter(role => role.role === user.role)[0];
    }

    function getUserType() {
        return UserTypes.filter(type => type.value === user.type)[0];
    }

    useEffect(() => {
        setPassword(generator.generate({
            length: 5,
            numbers: true,
            lowercase: false,
            uppercase: true,
            excludeSimilarCharacters: true
        }));

        if (user.id !== -1) {
            setRole(getUserRole());
            setUserType(getUserType());
        }
    }, []);

    return (
        <form className={styles.wrapper} onSubmit={handleFormSubmit}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h5>
                        {user.id === -1 && "Criar usuário"}
                        {user.id !== -1 && `Editando usuário #${user.id}`}
                    </h5>

                    <div className="mb-3">
                        <TextField 
                            name="inputName"
                            fullWidth
                            type="text" 
                            variant="outlined" 
                            size="small" 
                            label="Nome completo"
                            defaultValue={user.fullName}

                            style={{ marginRight: 10 }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField 
                            name="inputEmail"
                            fullWidth
                            type="text" 
                            variant="outlined" 
                            size="small" 
                            label="E-mail"
                            defaultValue={user.email}

                            style={{ marginRight: 10 }}
                        />
                    </div>
                    <div>
                        <Autocomplete 
                            disabled={user.id !== -1}
                            fullWidth
                            options={UserTypes}
                            getOptionLabel={(option: UserTypeProp) => option.type }
                            onChange={(event, userType) => {
                                setUserType(userType)   
                            }}
                            defaultValue={userType}
                            renderInput={(params: any) => (
                                <TextField 
                                    {...params}

                                    variant="outlined" 
                                    size="small" 
                                    label="Tipo de Usuário" 
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <h5>Informações adicionais</h5>

                    {!userType && (
                        <span>Insira um tipo de usuário para continuar.</span>
                    )}

                    {userType?.value === "cliente" && (
                        <div>
                            <div className="mb-3">
                                <TextField 
                                    name="inputPhone"
                                    fullWidth
                                    type="text" 
                                    variant="outlined" 
                                    size="small" 
                                    label="Telefone"

                                    style={{ marginRight: 10 }}
                                />
                            </div>
                        </div>
                    )}

                    {userType?.value === "funcionario" && (
                        <div className="mb-3">
                            <Autocomplete 
                                fullWidth
                                options={UserRoles}
                                defaultValue={getUserRole()}
                                getOptionLabel={(option: UserRoleProp) => option.role }
                                onChange={(event, userRole) => {
                                    setRole(userRole)   
                                }}
                                renderInput={(params: any) => (
                                    <TextField 
                                        {...params}

                                        variant="outlined" 
                                        size="small" 
                                        label="Cargo" 
                                    />
                                )}
                            />

                            {role && (
                                <div className={ styles.roleContainer }>
                                    <FaInfo color="var(--subtext)" />
                                    <span className={styles.roleDescription}>
                                        { role.description }
                                    </span>
                                </div>
                            )}

                            {user.id === -1 && (
                                <div className={styles.infoContainer}>
                                    <span>
                                        O usuário será criado com a senha placeholder <span className="font-weight-bold">{ password }</span>.
                                        Obrigatoriamente em seu primeiro acesso, ele terá que troca-la.
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <footer>
                <Button type="submit" className="me-2" text="Salvar" />
                <Button outline text="Cancelar" />
            </footer>
        </form>
    )
};

export { UserForm };