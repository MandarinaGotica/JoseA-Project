import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from "graphql";


//Definición del usertype con su tipo de dato en columnas
export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLInt }
    })
})