import { useState, useContext } from "react";
import styles from "./UserEdit.module.css";
import { Snackbar, TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";

import { USER_KEY, UserContext } from "contexts/UserContext/UserContext";

function UserEdit() {
    const { user, update } = useContext(UserContext);
    
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const [passwordError, setPasswordError] = useState<boolean>(false);

    async function onUserChange(event: any) {
        event.preventDefault();
        const form = event.target;

        const _user = user;
        _user.fullName = form.inputName.value;
        _user.email = form.inputEmail.value;

        await update(_user).then(() => {
            setShowSnackbar(true);
            localStorage.setItem(USER_KEY, JSON.stringify(_user));
        });
    }

    async function onPasswordChange(event: any) {
        event.preventDefault();

        const form = event.target;

        if (form.inputPassword.value === "") {
            setPasswordError(true);
        } else {
            if (form.inputPassword.value !== form.inputCPassword.value) {
                setPasswordError(true);
            } else {
                const _user = user;
                _user.setPassword(form.inputPassword.value);

                await update(_user).then(() => {
                    setShowSnackbar(true);
                });
            }
        }

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form onSubmit={onUserChange} className={styles.column}>
                    <div className={styles.columnContainer}>
                        <h5>Edição de Perfil</h5>

                        <div className="mb-3">
                            <TextField 
                                name="inputName"
                                fullWidth
                                type="text" 
                                variant="outlined" 
                                size="small" 
                                label="Nome completo"
                                defaultValue={user.fullName}
                                required

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
                                required

                                style={{ marginRight: 10 }}
                            />
                        </div>
                    </div>
                    <footer>
                        <button 
                            type="submit"
                        >
                            Salvar
                        </button>
                    </footer>
                </form>
                <form onSubmit={onPasswordChange}  className={styles.column}>
                    <div
                        className={styles.columnContainer}
                    >
                        <h5>Alteração de senha</h5>

                        <div className="mb-3">
                            <TextField 
                                name="inputPassword"
                                fullWidth
                                type="password" 
                                variant="outlined" 
                                size="small" 
                                label="Nova senha"
                                error={passwordError}

                                style={{ marginRight: 10 }}
                            />
                        </div>
                        <div className="mb-3">
                            <TextField 
                                name="inputCPassword"
                                fullWidth
                                type="password" 
                                variant="outlined" 
                                size="small" 
                                label="Confirmar nova senha"

                                style={{ marginRight: 10 }}

                                error={passwordError}
                                helperText={passwordError ? "As senhas não conferem" : null}
                            />
                        </div>
                    </div>
                    <footer>
                        <button 
                            type="submit"
                        >
                            Alterar senha
                        </button>
                    </footer>
                </form>
            </div>

            <Snackbar
                open={ showSnackbar }
                autoHideDuration={3000}
                onClose={() => { setShowSnackbar(false) }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Perfil editado com sucesso!</span>}
            />
        </div>
    )
};

export { UserEdit };