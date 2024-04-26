import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../Graphql/Queries";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../Graphql/Mutation";
import { Navigate } from "react-router-dom";

const ListOfUsers = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
    const [deleteUser] = useMutation(DELETE_USER);

    const handleLogout = () => {
        logout();
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;



    const handleDelete = async (user: any) => {
        try {
            deleteUser({ variables: { id: user.id } });

            // Actualizar la lista de usuarios después de eliminar
            refetch();
        } catch (error: any) {
            console.error("Error al eliminar usuario:", error.message);
        }
    };

    const renderActions = (user: any) => {
        if (isLoggedIn) {
            return (
                <>
                    <Link to={`/editar-usuario/${user.id}`}>Editar</Link>
                    <button onClick={() => handleDelete(user)}>eliminar</button>

                </>
            );
        }
        return null;
    };

    return (
        <div>

            <h2>Lista de Usuarios</h2>
            <div><Link to="/crear-usuario">Crear Usuario</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.getAllUsers.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 1 ? "Administrador" : "Usuario General"}</td>
                            <td>{renderActions(user)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfUsers;