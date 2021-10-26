export type IContextValues = {
    authenticated: boolean;
    login: (credentials: ICredentials) => Promise<boolean>;
    logout: () => void;
}

export type ICredentials = {
    username: string;
    password: string;
}

export type IToken = {
    expiry: string;
    token: string;
}