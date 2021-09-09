import styles from "./styles.module.css";

import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router";

function Login() {
    let history = useHistory();
    document.title = "DSE - Autenticação de Usuário"

    function handleLoginSubmit(event: any) {
        event.preventDefault();

        history.push("/products");
    };

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
                    <TextField label="E-mail" fullWidth variant="outlined" />
                </div>
                <div className="mb-3">
                    <TextField type="password" label="Senha" fullWidth variant="outlined" />
                </div>

                <div className="form-group d-flex align-items-center justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" value="" className="form-check-input" id="flexCheckbox" />
                        <label htmlFor="flexCheckbox">Lembrar-me</label>
                    </div>

                    <button type="submit" className="btn-solid">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    )
};

export { Login };