import { api } from "api";
import { AuthLoading } from "components/display/AuthLoading";
import {
    createContext,
    useState,
    useEffect
} from "react";

import { 
    IContextValues,
    ICredentials,
    IToken
} from "./IUserContext";

import { parseISO } from "date-fns";

export const UserContext = createContext({} as IContextValues);

export function UserProvider({ children }: any) {
    const TOKEN_KEY = "@dse-Token";
    const USER_KEY = "@dse-User";

    const [loading, setLoading] = useState<boolean>(true);

    const [user, setUser] = useState<any>({});
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const tokenStorage = localStorage.getItem(TOKEN_KEY);
        let currentToken: IToken = { expiry: "", token: "" };

        if (tokenStorage) currentToken = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");

        if (currentToken.token !== "" && !tokenHasExpired(currentToken)) {
            api.defaults.headers.Authorization = `Token ${currentToken.token}`
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    function tokenHasExpired(token: IToken) {
        const currentDate = new Date();
        const tokenDate = parseISO(token.expiry);

        return currentDate > tokenDate;
    }

    async function login(credentials: ICredentials): Promise<boolean> {
        return await api.post("/login/", credentials).then((response) => {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(response.data));
            api.defaults.headers.Authorization = `Token ${response.data.token}`

            response = response.data;

            setAuthenticated(true);

            return true;
        }).catch((err) => {
            return false;
        });
    };

    async function logout() {
        api.defaults.headers.Authorization = null;
        setAuthenticated(false);
        localStorage.removeItem(TOKEN_KEY);
    }

    if (loading) return <AuthLoading />

    return (
        <UserContext.Provider
            value={{
                login,
                logout,
                authenticated
            }}
        >
            { children }
        </UserContext.Provider>
    )
};