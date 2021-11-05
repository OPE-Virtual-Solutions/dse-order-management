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
    IToken,
    UserInstance
} from "./IUserContext";

import { parseISO } from "date-fns";

import { User } from "interfaces/User";

export const UserContext = createContext({} as IContextValues);

export function UserProvider({ children }: any) {
    const TOKEN_KEY = "@dse-Token";
    const USER_KEY = "@dse-User";

    const [loading, setLoading] = useState<boolean>(true);

    const [user, setUser] = useState<User>(UserInstance);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const tokenStorage = localStorage.getItem(TOKEN_KEY);

        let currentToken: IToken = { expiry: "", token: "" };
        let _user: User = UserInstance;

        if (tokenStorage) { 
            currentToken = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
            _user = JSON.parse(localStorage.getItem(USER_KEY) || "{}");
        }

        if (currentToken.token !== "" && !tokenHasExpired(currentToken)) {
            api.defaults.headers.Authorization = `Token ${currentToken.token}`
            
            setAuthenticated(true);
            setUser(_user);
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
            const userToken: IToken = {
                expiry: response.data.token.expiry,
                token: response.data.token.token
            };

            const _user = new User(response.data.user);

            localStorage.setItem(TOKEN_KEY, JSON.stringify(userToken));
            localStorage.setItem(USER_KEY, JSON.stringify(_user));

            api.defaults.headers.Authorization = `Token ${userToken.token}`
            
            setUser(_user);
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
                user,
                login,
                logout,
                authenticated
            }}
        >
            { children }
        </UserContext.Provider>
    )
};