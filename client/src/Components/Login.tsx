import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../Graphql/Mutation";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
    const { login } = useContext(AuthContext);


    //Maneja form una vez que es enviado
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //Ejecutamos query LoginUser para poder iniciar sesión.
            const { data } = await loginUser({
                variables: { email, password }
            });

            console.log("Usuario autenticado:", data.loginUser);
            login(email, password);
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    //Renderizado condicional de acuerdo a condiciones de la data
    const renderButtonOrLink = () => {
        if (loading) {
            return "Iniciando Sesión...";
        } else if (error) {
            return <p>Error: {error.message}</p>;
        } else if (data && data.loginUser) {
            return <Link to="/list-of-users">Ir a Lista de Usuarios</Link>;
        } else {
            return (
                <>
                    <button type="submit" disabled={loading}>
                        Iniciar Sesión
                    </button>
                    <Link to="/crear-usuario">Crear Usuario</Link>
                </>
            );
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {renderButtonOrLink()}
            </form>
        </div>
    );
};

export default Login;