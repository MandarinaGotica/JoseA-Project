import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/Users";
import { Users } from '../../Entities/User';

//Se define metodo para crear usuario en graphql
export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLInt }
    },

    async resolve(parent: any, args: any) {
        const { name, username, email, password, role } = args;

        await Users.insert({ name, username, email, password, role })
        return args;

    }
}

//Se define metodo para crear usuario en graphql
export const UPDATE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
    },

    async resolve(parent: any, args: any) {
        const { id, name, username } = args;

        try {
            // Busca el usuario por su ID
            const user = await Users.findOneBy({ id: id });

            if (!user) {
                throw new Error("User not found");
            }

            // Actualiza el nombre y el nombre de usuario del usuario encontrado
            user.name = name;
            user.username = username;

            // Guarda los cambios en la base de datos
            await user.save();

            // Devuelve el usuario actualizado
            return user;
        } catch (error: any) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
};


//Se define metodo para borrar usuario en graphql
export const DELETE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const id = args.id;
        await Users.delete(id)

        return args.id
    },
}

export const LOGIN_USER = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { email, password } = args;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.password !== password) {
            throw new Error('Contraseña incorrecta');
        }

        return user;
    },
};