import { createContext } from "react";

//Definición de interfaz para tener el contexto de la app.
interface AuthContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export default AuthContext;

