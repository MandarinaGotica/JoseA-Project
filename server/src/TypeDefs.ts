import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUserByEmail(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(id: ID!, name: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
    loginUser(email: String!, password: String!): User
    logoutUser: String
  }
`;