import { 
    useContext, 
    useState,
} from "react";
import { Redirect, useHistory } from "react-router";

import styles from "./styles.module.css";

import TextField from '@material-ui/core/TextField';

import { UserContext } from "contexts/UserContext/UserContext";

import { Button } from "components/forms/Button";
import { Snackbar } from "components/display/Snackbar";

type ILoginProps = {
    username: string;
    password: string;
}

function Login() {
    const history = useHistory();

    const {
        login,
        authenticated 
    } = useContext(UserContext);

    document.title = "DSE - Autenticação de Usuário"

    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [showSnack, setShowSnack] = useState<boolean>(false);

    async function handleLoginSubmit(event: any) {
        event.preventDefault();
        setAuthenticating(true);

        const credentials: ILoginProps = {
            username: event.target.inputEmail.value,
            password: event.target.inputPassword.value
        }

        login(credentials).then((response) => {
            response ? history.push("/home") : setShowSnack(true);
        }).finally(() => {
            setAuthenticating(false);
        });
    };

    if (authenticated) {
        return <Redirect to="/home" />
    }

    return (
        <div className={ styles.loginContainer }>
            <div className={ styles.loginHeaderContainer }>
                <img src="logo192.png" alt="Logo da Virtual Solutions" />
                <h4>Delivery System Express</h4>
                <span>Sistema de gerenciamento de pedidos</span>
            </div>

            <h6>Autenticação de Usuário</h6>

            <form onSubmit={handleLoginSubmit} className={ styles.loginFormContainer }>
                <div className="mb-3">
                    <TextField id="inputEmail" label="E-mail" fullWidth variant="outlined" />
                </div>
                <div className="mb-3">
                    <TextField id="inputPassword" type="password" label="Senha" fullWidth variant="outlined" />
                </div>

                <div className="form-group d-flex align-items-center justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" value="" className="form-check-input" id="flexCheckbox" />
                        <label htmlFor="flexCheckbox">Lembrar-me</label>
                    </div>

                    <Button 
                        text="Entrar"
                        type="submit"
                        disabled={authenticating}
                    />
                </div>
            </form>

            <Snackbar 
                open={authenticating}
                loadingSnackbar={true}
                onClose={() => { setShowSnack(false) }}
            />

            <Snackbar
                open={ showSnack }
                onClose={() => { setShowSnack(false) }}
                message={<span id="message-id">E-mail ou senha inválidos</span>}
            />
        </div>
    )
};

export { Login };