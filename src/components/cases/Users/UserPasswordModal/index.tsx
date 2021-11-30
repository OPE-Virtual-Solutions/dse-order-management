import { useState, useContext } from "react";

import { TextField } from "@material-ui/core";
import { Button } from "components/forms/Button";

import { UserContext } from "contexts/UserContext/UserContext";

import styles from "./UserPasswordModal.module.css";

function UserPasswordModal() {
    const { firstChangePassword, logout } = useContext(UserContext);

    const [error, setError] = useState<boolean>(false);

    function handleFormSubmit(event: any) {
        event.preventDefault();

        const form = event.target;

        if (form.inputPassword.value !== form.inputCPassword.value) {
            setError(true);
        } else {
            firstChangePassword(form.inputPassword.value);
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.container}>
                    <h4>Aviso</h4>
                    <p>
                        Esse é o seu primeiro acesso. Por questões de segurança, atualize
                        sua senha antes de continuar usando o sistema.
                    </p>

                    <div className="mt-3 mb-2">
                        <TextField 
                            name="inputPassword"
                            fullWidth
                            type="password" 
                            variant="outlined" 
                            size="small" 
                            label="Senha"

                            style={{ marginRight: 10 }}

                            error={error}
                        />
                    </div>
                    <div className="mb-2">
                        <TextField 
                            name="inputCPassword"
                            fullWidth
                            type="password" 
                            variant="outlined" 
                            size="small" 
                            label="Confirmar senha"

                            style={{ marginRight: 10 }}

                            error={error}
                            helperText={error ? "As senhas não conferem" : null}
                        />
                    </div>
                </div>
                <footer>
                    <Button type="submit" className="me-2" text="Salvar e continuar" />
                    <Button 
                        onClick={() => logout()}
                        outline 
                        text="Desconectar usuário" 
                    />
                </footer>
            </form>
        </div>
    )
};

export { UserPasswordModal };