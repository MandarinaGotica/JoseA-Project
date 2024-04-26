import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../Graphql/Mutation";
import AuthContext from "../AuthContext";
import { Link, useLocation } from "react-router-dom";
import { GET_USER } from "../Graphql/Queries";

const UpdateUser = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { id: userId },
    });

    const { isLoggedIn } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [updateUser] = useMutation(UPDATE_USER);

    // Actualizar el estado local cuando los datos del usuario cambien
    useEffect(() => {
        if (data && data.getUser) {
            setName(data.getUser.name);
            setUsername(data.getUser.username);
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Valores a enviar:", name, username);
            await updateUser({
                variables: { id: userId, name, username }
            });
            setMessage("Usuario editado exitosamente");
            // Refrescar los datos del usuario después de la actualización
            refetch();
        } catch (error: any) {
            console.error("Error al editar usuario:", error.message);
        }
    };

    return (
        <div>
            <h2>Editar usuario</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Actualizar Usuario</button>
                </form>
            )}
            {message && <p>{message}</p>}
            {isLoggedIn ? (
                <Link to="/list-of-users">Ir a List of Users</Link>
            ) : (
                <Link to="/login">Iniciar Sesión</Link>
            )}
        </div>
    );
};

export default UpdateUser;