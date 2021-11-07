import { useEffect } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Button } from "components/forms/Button";
import { UserPost } from "interfaces/User";
import { useState } from "react";
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

function UserForm() {
    const [userType, setUserType] = useState<UserTypeProp | null>(UserTypes[1]);
    const [role, setRole] = useState<UserRoleProp | null>();

    const [password, setPassword] = useState<string>("");

    async function handleFormSubmit(event: any) {
        event.preventDefault();

        const form = event.target;

        const user: UserPost = {
            nome_usuario: form.inputName.value,
            email: form.inputEmail.value,
            tipo: userType?.value || "funcionario",
            senha: password,
            cargo: userType && userType.value === "funcionario" ? role?.role : undefined,
            telefone: userType && userType.value === "cliente" ? form.inputPhone.value : undefined
        };

        await UserService.create(user).then((response) => {
            if (response.status) window.location.reload();
        }).catch((error) => {
            console.log(error.response);
        });
    }

    useEffect(() => {
        setPassword(generator.generate({
            length: 5,
            numbers: true,
            lowercase: false,
            uppercase: true,
            excludeSimilarCharacters: true
        }))
    }, []);

    return (
        <form className={styles.wrapper} onSubmit={handleFormSubmit}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h5>Criar usuário</h5>

                    <div className="mb-3">
                        <TextField 
                            name="inputName"
                            fullWidth
                            type="text" 
                            variant="outlined" 
                            size="small" 
                            label="Nome completo"

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

                            style={{ marginRight: 10 }}
                        />
                    </div>
                    <div>
                        <Autocomplete 
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

                            <div className={styles.infoContainer}>
                                <span>
                                    O usuário será criado com a senha placeholder <span className="font-weight-bold">{ password }</span>.
                                    Obrigatoriamente em seu primeiro acesso, ele terá que troca-la.
                                </span>
                            </div>
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