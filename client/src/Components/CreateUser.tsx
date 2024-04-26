import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Graphql/Mutation";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

const CreateUser = () => {
    //Se define si está o no la sesión activa.
    const { isLoggedIn } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(2);
    const [message, setMessage] = useState("");
    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({
                variables: { name, username, email, password, role: Number(role) }
            });
            setMessage("Usuario registrado exitosamente");
            setName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setRole(2);
        } catch (error: any) {
            console.error("Error al crear usuario:", error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Usuario</h2>
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
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Rol:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setRole(Number(e.target.value))
                        }
                    >
                        <option value="1">Administrador</option>
                        <option value="2">Usuario General</option>
                    </select>
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
            {message && <p>{message}</p>}
            {isLoggedIn ? (
                <Link to="/list-of-users">Ir a List of Users</Link>
            ) : (
                <Link to="/login">Iniciar Sesión</Link>
            )}
        </div>
    );
};

export default CreateUser;