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
import { UserService } from "services/user.service";

export const UserContext = createContext({} as IContextValues);

export const USER_KEY = "@dse-User";

export function UserProvider({ children }: any) {
    const TOKEN_KEY = "@dse-Token";

    const [loading, setLoading] = useState<boolean>(true);

    const [firstAccess, setFirstAccess] = useState<boolean>(false);

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
            setUser(new User({
                id: _user.id,
                costumer: { phone: _user.phone },
                email: _user.email,
                employee: { role: _user.role },
                firstAccess: _user.firstAccess || false,
                fullName: _user.fullName,
                type: _user.type,
                active: false,
            }));
            setFirstAccess(_user.firstAccess || false);
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

            if (_user.firstAccess === true) {
                setFirstAccess(true);
            }

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
        setFirstAccess(false);

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    async function firstChangePassword(password: string) {
        const _user = user;
        _user.setPassword(password);
        _user.firstAccess = false;

        await UserService.update(user).then((response) => {
            if (response.status) {
                setFirstAccess(false);

                _user.password = undefined;

                localStorage.setItem(USER_KEY, JSON.stringify(_user));
            }
        }).catch((error) => {
            console.log(error.response);
        })
    };

    async function update(user: User) {
        return await UserService.update(user);
    };

    if (loading) return <AuthLoading />

    return (
        <UserContext.Provider
            value={{
                loading,
                firstAccess,
                user,
                login,
                logout,
                authenticated,
                firstChangePassword,
                update
            }}
        >
            { children }
        </UserContext.Provider>
    )
};